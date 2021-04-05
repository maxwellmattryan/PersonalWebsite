#!/bin/bash

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

NODE_VERSION=15.10.0-alpine3.10

API_PROJECT=mattmaxwell-api
HEROKU_API_IMAGE="heroku_$API_PROJECT:$(date +%s)"
UI_PROJECT=mattmaxwell-ui
HEROKU_UI_IMAGE="heroku_$UI_PROJECT:$(date +%s)"
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
    STEPS=12
else
    if [ "$API_ACTION" = false ] && [ "$UI_ACTION" = false ]
    then
        API_ACTION=true
        UI_ACTION=true

        STEPS=12
    else
        STEPS=7
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

echo -e "[Success]: Pre-build check(s) passed!\n"

if [ "$API_ACTION" = true ]
then
    cd api/ || echo -e "\nERROR: API folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building local API image ...\n"
    docker build . --tag "$API_PROJECT"
    echo -e "[Success]: Built local API image!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local API image for Container Registry ..."
    docker tag "$API_PROJECT" "$HEROKU_API_IMAGE"
    echo -e "[Success]: Tagged local API image!\n"

    echo -e "($(expr $START + 2)/$STEPS) Pushing local API image to Container Registry ...\n"
    heroku container:push "$HEROKU_API_IMAGE" -a "$API_PROJECT"
    echo -e "[Success]: Pushed local API image!\n"

    echo -e "($(expr $START + 3)/$STEPS) Deploying to Heroku API project ...\n"
    heroku container:release "$HEROKU_API_IMAGE" -a "$API_PROJECT"
    echo -e "[Success]: Deployed app!\n"

    echo -e "($(expr $START + 4)/$STEPS) Removing API images from Docker...\n"
    docker rmi "$API_PROJECT:latest"
    docker rmi "$HEROKU_API_IMAGE:latest"
    echo -e "[Success]: Removed API image(s)!\n"

    START=7

    cd ../
fi

if [ "$UI_ACTION" = true ]
then
    cd ui/ || echo -e "\nERROR: UI folder does not exist" | exit

    echo -e "($(expr $START)/$STEPS) Building local UI image ...\n"
    docker build . --tag "$UI_PROJECT"
    echo -e "[Success]: Built local UI image!\n"

    echo -e "($(expr $START + 1)/$STEPS) Tagging local UI image for Container Registry ..."
    docker tag "$UI_PROJECT" "$HEROKU_UI_IMAGE"
    echo -e "[Success]: Tagged local UI image!\n"

    echo -e "($(expr $START + 2)/$STEPS) Pushing local UI image to Container Registry ...\n"
    heroku container:push "$HEROKU_UI_IMAGE" -a "$UI_PROJECT"
    echo -e "[Success]: Pushed local UI image!\n"

    echo -e "($(expr $START + 3)/$STEPS) Deploying to Heroku UI project ...\n"
    heroku container:release "$HEROKU_UI_IMAGE" -a "$UI_PROJECT"
    echo -e "[Success]: Deployed app!\n"

    echo -e "($(expr $START + 4)/$STEPS) Removing UI images from Docker...\n"
    docker rmi "$UI_PROJECT:latest"
    docker rmi "$HEROKU_UI_IMAGE:latest"
    echo -e "[Success]: Removed UI image(s)!\n"

    if [ "$STEPS" = 12 ]
    then
        START=12
    else
        START=7
    fi

    cd ../
fi

echo -e "($(expr $START)/$STEPS) Cleaning up dangling / unused images...\n"
docker rmi "node:$NODE_VERSION"
printf 'y\n' | docker image prune
echo -e "[Success]: Cleaned up images!\n"

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total build and deployment time elapsed: $(convertsecs $execution_time)\n"

echo -e "COMPLETE! Check it out at https://$DOMAIN/"
