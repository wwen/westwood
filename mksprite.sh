if cd media/css;then
    if spritemapper sprite.dev.css;then
        echo ""
        echo "Successful: the css and sprite map have been updated"
    else
        echo ""
        echo "Build Fail: spritemapper..."
        echo "Info: Check either if spritemapper is installed or the sprite.dev.css exists in /media/css."
    fi
else
    echo "Build Fail: invalid stylesheet path"
    echo "Info: valid path should be /media/css"
fi
