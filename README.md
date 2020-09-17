# Simple mp3 cutter

This is a js library used to cut mp3 easily.

Feel free to contribute!

## API

### Create a new cutter

```
let cutter = new mp3-cutter(libPath);
```

```libPath``` is optionnal, default path is ```./lib```


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
