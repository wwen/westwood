if cd media/js;then
    rm all.js
    if (gjslint app.js) && (gjslint main.js) && (gjslint router.js);then
        if (gjslint -r collections/) && (gjslint -r models/) && (gjslint -r views/);then
            echo ''
            echo 'Successful: javascript style check passed ... '
            echo ''
            if cd ../tools/minify;then
                echo 'start minifying your javascript ...'
                echo ''
                if node r.js -o build.js;then
                    echo 'Successful: all javascript has been minified into media/js/all.js ...'
                else
                    echo 'Fail: unable to minify the javascript files ...'
                fi
            else
                echo 'media/tools/minify directory does not exist ...'
            fi
        else
            echo ''
            echo 'Fail: you did not pass the javascript style check ...'
            echo ''
        fi
    else
        echo ''
        echo 'Fail: you did not pass the javascript style check ...'
        echo ''
    fi
fi
