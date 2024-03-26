#!/bin/bash
STAGE=${2:-'*'}
OS=$OSTYPE

find "$1" -name ".env.$STAGE" | sed -r 's/\.env.*.[[:alnum:]]+$//' | xargs -I{} cp "{}.env.$STAGE" "{}.env"
echo "Moved .env.$STAGE to .env 👏"
echo "Now checking for any operating system specific type 🍻"

if [[ "$OS" =~ 'darwin' ]] 
then 
    echo "Found $OS"
    find "$1" -name ".env.mac.$STAGE" | sed -r 's/\.env.*.[[:alnum:]]+$//' | xargs -I{} cp "{}.env.mac.$STAGE" "{}.env"
    find "$1" -name ".env.mac.$STAGE" | sed -E 's/\.env.*.[[:alnum:]]+$//' | xargs -I{} cp "{}.env.mac.$STAGE" "{}.env"
    echo "Moved .env.mac.$STAGE to .env 👏"
fi