# Simple mp3 cutter

![](https://img.badgesize.io/lubenard/simple-mp3-cutter/master/src/cutter.js)
![](https://img.badgesize.io/lubenard/simple-mp3-cutter/master/src/cutter.min.js?label=Minified_version)

This is a js library used to cut mp3 easily.

Feel free to contribute!

## Minified version

Minified version has been compiled using [uglifyjs](https://github.com/mishoo/UglifyJS)

to minify the doc, do: 

```
uglifyjs -e -o src/cutter.min.js src/cutter.js
```

## API

### Create a new cutter

```
let cutter = new mp3cutter(libPath, debug);
```

```libPath``` is optionnal, default path is ```./lib```

```debug``` is optionnal. It print debug log. Default value is false.

### Cut a mp3

```
cutter.cut(blob, start, end, callback, bitrate);
```

```blob``` is the audio blob.

```start``` Start time in second.

```end``` End time in second.

```callback``` callback function (it is not possible to return data from async)

```bitrate``` is optionnal, default is ```192```

That's it !

## Credits

This library is heavily inspired by [audio-cutter](https://github.com/meowtec/audio-cutter)

The encoder used is [mp3-lame-encoder-js](https://github.com/higuma/mp3-lame-encoder-js)


## Works better with an example !

Here is a more concrete example on how to use this library

```javascript
function getMyMp3Cut(blob) {
	let cutter = new mp3cutter();

	cutter.cut(blob, 0, 30, function(cuttedBlob) {
		console.log("My blob has been cutted! ");
		console.log(cuttedBlob);
	});
}
```
