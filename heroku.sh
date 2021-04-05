#!/bin/bash

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

NODE_VERSION=15.10.0-alpine3.10

API_PROJECT=mattmaxwell-api
HEROKU_API_IMAGE="${API_PROJECT}_$(date +%s)"
UI_PROJECT=mattmaxwell-ui
HEROKU_UI_IMAGE="${UI_PROJECT}_$(date +%s)"
DOMAIN=mattmaxwell.dev

API_ACTION=false
UI_ACTION=false
for i in "$@"; do
    case $i in
    -a|--api)
        API_ACTION=true
        shift
        ;;
    -u|--ui)
        UI_ACTION=true
        shift
        ;;
    esac
done

START=1
if [ "$API_ACTION" = true ] && [ "$UI_ACTION" = true ]
then
    STEPS=5
else
    if [ "$API_ACTION" = false ] && [ "$UI_ACTION" = false ]
    then
        API_ACTION=true
        UI_ACTION=true

        STEPS=5
    else
        STEPS=3
    fi
fi

start_time=$(date +%s)

echo -e "\n($START/$STEPS) Initiating pre-build checks...\n"
START=2

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ];
then
    echo -e "\t[✘] Branch is set to \"main\"\n"
    echo -e "To switch to the correct branch, please use:\n\n\tgit checkout main"

#    exit 1;
else
    echo -e "\t[✔] Branch is set to \"main\""
fi

if ! git diff-index --quiet HEAD --; then
    echo -e "\t[✘] No existing repo changes\n"
    echo -e "To rid current changes (temporarily), please use:\n\n\tgit stash"

#    exit 1;
else
    echo -e "\t[✔] No existing repo changes\n"
fi

echo -e "[Success]: Pre-build check(s) passed!\n"

if [ "$API_ACTION" = true ]
then
    cd api/ || echo -e "\nERROR: API folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building source code for API ..."
    npm run build
    echo -e "[Success]: Built API source code!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local API image for Container Registry ..."
    git commit --allow-empty -m "BUILD: $HEROKU_API_IMAGE"
    echo -e "[Success]: Tagged local API image!\n"

    cd ../

    echo -e "($(expr $START + 2)/$STEPS) Pushing local API image to Container Registry ...\n"
    git subtree push --prefix api heroku-api main
    echo -e "[Success]: Pushed local API image!\n"

    START=4
fi

if [ "$UI_ACTION" = true ]
then
    cd ui/ || echo -e "\nERROR: UI folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building source code for UI ..."
    npm run build
    echo -e "[Success]: Built UI source code!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local UI image for Container Registry ..."
    git commit --allow-empty -m "BUILD: $HEROKU_UI_IMAGE"
    echo -e "[Success]: Tagged local API image!\n"

    cd ../

    echo -e "($(expr $START + 2)/$STEPS) Pushing local UI image to Container Registry ...\n"
    git subtree push --prefix ui heroku-ui main
    echo -e "[Success]: Pushed local UI image!\n"

    if [ "$STEPS" = 5 ]
    then
        START=5
    else
        START=4
    fi
fi

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total build and deployment time elapsed: $(convertsecs $execution_time)\n"

echo -e "COMPLETE! Check it out at https://$DOMAIN/"
