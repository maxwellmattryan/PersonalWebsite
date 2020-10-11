#!/bin/bash

start_time=$(date +%s)

for i in "$@"; do
    case $i in
    -a|--api)
        cd api/
    
        heroku container:push web
        echo -e "SUCCESS: Pushed API container\n"
    
        heroku container:release web
        echo -e "SUCCESS: Released API container\n"
    
        cd ../

        shift
        ;;
    -u|--ui)
        cd ui/
    
        heroku container:push web
        echo -e "SUCCESS: Pushed UI container\n"
    
        heroku container:release web
        echo -e "SUCCESS: Released UI container\n"
    
        cd ../
        
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