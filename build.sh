rm -R ./build
mkdir -p ./build/lib
cp -r ./src/lib/* ./build/lib/
cp -r ./src/css ./build/css

npm list --depth=0 | grep gulp@ || npm install gulp
npm list --depth=0 | grep gulp-angular-templatecache@ || npm install gulp-angular-templatecache
npm list --depth=0 | grep gulp-less@ || npm install gulp-less
npm list --depth=0 | grep gulp-replace@ || npm install gulp-replace
gulp || exit
node r.js -o build.js
gulp update-version || exit

# sed -i "s/v=[[:digit:]]\+\(['\"]\)/v=`date +%s`\1/g" build/index.html