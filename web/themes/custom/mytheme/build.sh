#!/bin/sh
echo ""
echo ""
echo "👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇"
echo "This is a barebones script. It does bulk renames without any regard to whether"
echo "the renamed file is valid. If you use any of the following, it will fail:"
echo ""
echo " - JavaScript reserved words"
echo " - PHP reserved words"
echo " - Spaces or non-standard characters"
echo " - hyphens or underscores"
echo ""
echo "👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆"
echo ""

read -p "Enter the name of the theme (example: Mytheme): " THEMENAME

# Convert themename to lower case.
THEMENAME_LOWER=$(echo "$THEMENAME" | tr '[:upper:]' '[:lower:]')

# Copy Mytheme theme from core.
cp -r ../../core/themes/mytheme/* ./
DIRS=("./" "config/install/" "config/optional/" "config/schema/")

# Rename all filenames to use new themename.
for DIR in "${DIRS[@]}"
do
  for file in $DIR*mytheme* ; do mv $file ${file//mytheme/$THEMENAME_LOWER} ; done
done

# Rename the prerender file by ensuring that only the first letter of the theme is capitalized.
THEMENAME_FIRST_LETTER_CAPS="$(tr '[:lower:]' '[:upper:]' <<< ${THEMENAME_LOWER:0:1})${THEMENAME_LOWER:1}"
mv src/MythemePreRender.php src/${THEMENAME_FIRST_LETTER_CAPS}PreRender.php

# Rename all occurrances of "Mytheme" within the theme (both lower case and normal).
grep -rl mytheme . --exclude=\*.{sh,md} --exclude-dir={node_modules,scripts,.git} | xargs sed -i "" -e "s/mytheme/$THEMENAME_LOWER/g"
grep -rl Mytheme . --exclude=\*.{sh,md} --exclude-dir={node_modules,scripts,.git} | xargs sed -i "" -e "s/Mytheme/$THEMENAME/g"

# Add core_version_requirement to *.info.yml and remove `package: Core`, and `experimental: true`
sed -i .bak 's/package: Core/core_version_requirement: ^9/g' *.info.yml
sed -i .bak 's/experimental: true//g' *.info.yml
rm *.bak

# Move make configuration optional (this is needed if Mytheme is already enabled).
mv ./config/install/block* ./config/optional/
mv ./config/install/core* ./config/optional/
