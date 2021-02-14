#!/bin/bash

set -e

start_time=$(date +%s)

for i in "$@"; do
    case $i in
    -a|--api)
        cd api/ || echo -e "\nERROR: API folder does not exist\n" | exit

        docker rmi api-*
        docker build . --tag gcr.io/mattmaxwell-304801/mattmaxwell-api:latest
        docker push gcr.io/mattmaxwell-304801/mattmaxwell-api:latest

        shift
        ;;
    -u|--ui)
        cd ui/ || echo -e "\nERROR: UI folder does not exist\n" | exit

        npm run build:prod
        cd ../
        echo -e "\n (1/3) SUCCESS: Built new UI dist bundle\n"

        git add .
        git commit --allow-empty -m "BUILD: UI build on $(date)"
        echo -e "\n (2/3) SUCCESS: Committed new UI dist bundle to repository\n"

        git subtree push --prefix ui heroku-ui master
        echo -e "\n (3/3) SUCCESS: Pushed new UI dist bundle to Heroku\n"

        shift
        ;;
    esac
done

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total time elapsed: $(convertsecs $execution_time)"
