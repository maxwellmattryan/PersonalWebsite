#!/bin/bash

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
    echo -e "App MUST be deployed from the main branch!\n\nAborting script"
    exit 1;
fi

start_time=$(date +%s)

API_IMAGE=mattmaxwell-api
UI_IMAGE=mattmaxwell-ui
DOMAIN=mattmaxwell.tech

GCP_HOSTNAME=gcr.io
GCP_PLATFORM=managed
GCP_REGION=us-central1
GCP_PROJECT_ID=mattmaxwell-304801
GCP_API_SERVICE=mattmaxwell-api
GCP_UI_SERVICE=mattmaxwell-ui
GCP_API_IMAGE_PATH="$GCP_HOSTNAME/$GCP_PROJECT_ID/$API_IMAGE"
GCP_UI_IMAGE_PATH="$GCP_HOSTNAME/$GCP_PROJECT_ID/$UI_IMAGE"

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

if [ "$API_ACTION" = true ] && [ "$UI_ACTION" = true ]
then
    STEPS=9
else
    STEPS=6
fi

START=1

if [ "$API_ACTION" = true ]; then
    cd api/ || echo -e "ERROR: API folder does not exist\n" | exit

    echo -e "Starting API build and deployment...\n"

    docker build . --tag "$API_IMAGE"
    echo -e "\n($(expr $START)/$STEPS) SUCCESS: Built API image on local machine\n"

    docker tag "$API_IMAGE" "$GCP_API_IMAGE_PATH"
    echo -e "\n($(expr $START + 1)/$STEPS) SUCCESS: Tagged local API image with name in Container Registry\n"

    docker push "$GCP_API_IMAGE_PATH"
    echo -e "\n($(expr $START + 2)/$STEPS) SUCCESS: Pushed API image to Container Registry\n"

    gcloud run deploy "$GCP_API_SERVICE" --image="$GCP_API_IMAGE_PATH" --platform="$GCP_PLATFORM" --region="$GCP_REGION"
    echo -e "\n($(expr $START + 3)/$STEPS) SUCCESS: Deployed API image to Cloud Run service\n"

    START=5

    cd ../
fi

if [ "$UI_ACTION" = true ]; then
    cd ui/ || echo -e "\nERROR: UI folder does not exist\n" | exit

    echo -e "Starting UI build and deployment...\n"

    docker build . --tag "$UI_IMAGE"
    echo -e "\n($(expr $START)/$STEPS) SUCCESS: Built API image on local machine\n"

    docker tag "$UI_IMAGE" "$GCP_UI_IMAGE_PATH"
    echo -e "\n($(expr $START + 1)/$STEPS) SUCCESS: Tagged local UI image with name in Container Registry\n"

    docker push "$GCP_UI_IMAGE_PATH"
    echo -e "\n($(expr $START + 2)/$STEPS) SUCCESS: Pushed UI image to Container Registry\n"

    gcloud run deploy "$GCP_UI_SERVICE" --image="$GCP_UI_IMAGE_PATH" --platform="$GCP_PLATFORM" --region="$GCP_REGION"
    echo -e "\n($(expr $START + 3)/$STEPS) SUCCESS: Deployed UI image to Cloud Run service\n"

    if [ "$STEPS" = 9 ]; then
        START=9
    fi

    cd ../
fi

docker rmi "$API_IMAGE:latest"
docker rmi "$UI_IMAGE:latest"
docker rmi "$GCP_API_IMAGE_PATH:latest"
docker rmi "$GCP_UI_IMAGE_PATH:latest"
docker rmi "$(docker images | grep node)"
docker image prune
echo -e "\n($(expr $START)/$STEPS) SUCCESS: Removed local images\n"

echo -e "\nCompleted build and deployment of app! Check it out at https://$DOMAIN/\n"

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total time elapsed: $(convertsecs $execution_time)"
