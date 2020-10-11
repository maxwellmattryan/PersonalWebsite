#!/bin/bash

start_time=$(date +%s)

for i in "$@"; do
    case $i in
    -a|--api)
        git subtree push --prefix api heroku-api master
        echo -e "SUCCESS: Pushed API code changes to mattmaxwell-api on Heroku"
        shift
        ;;
    -u|--ui)
        git subtree push --prefix ui heroku-ui master
        echo -e "SUCCESS: Pushed UI code changes to mattmaxwell-ui on Heroku"
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