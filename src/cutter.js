class mp3cutter {
	//libPath must end with a slash
	constructor(libPath = "./lib/", log = false) {
        self.Mp3LameEncoderConfig = {
			memoryInitializerPrefixURL: libPath,
			TOTAL_MEMORY: 1073741824,
		};
		this.libPath = libPath;
		this.logger = log;

		var ref = document.getElementsByTagName("script")[0];
		var script = document.createElement("script");

		script.src = this.libPath + "Mp3LameEncoder.min.js";
		ref.parentNode.insertBefore(script, ref);
	}

	logger(message) {
		if (this.log)
			console.log(message);
	}

	async cut(src, start, end, callback , bitrate = 192) {
		if (!src)
			throw 'Invalid parameters!';

		if (start > end)
			throw 'Start is bigger than end!';
		else if (start < 0 || end < 0)
			throw 'Start or end is negative, cannot process';

		// Convert blob into ArrayBuffer
		let buffer = await new Response(src).arrayBuffer();
		let audioContext = new AudioContext();

		//Convert ArrayBuffer into AudioBuffer
		audioContext.decodeAudioData(buffer).then(function(decodedData) {
			logger(decodedData);
			//Compute start and end values in secondes
			let computedStart = decodedData.length * start / decodedData.duration;
			let computedEnd = decodedData.length * end / decodedData.duration;

			//Create a new buffer
			const newBuffer = audioContext.createBuffer(decodedData.numberOfChannels, computedEnd - computedStart , decodedData.sampleRate)

			// Copy from old buffer to new with the right slice.
			// At this point, the audio has been cut
			for (var i = 0; i < decodedData.numberOfChannels; i++) {
				newBuffer.copyToChannel(decodedData.getChannelData(i).slice(computedStart, computedEnd), i)
			}

			logger(newBuffer);

			// Bitrate is  by default 192, but can be whatever you want
			let encoder = new Mp3LameEncoder(newBuffer.sampleRate, bitrate);

			//Recreate Object from AudioBuffer
			let formattedArray = {
				channels: Array.apply(null, { length: (newBuffer.numberOfChannels - 1) - 0 + 1 }).map((v, i) => i + 0).map(i => newBuffer.getChannelData(i)),
				sampleRate: newBuffer.sampleRate,
				length: newBuffer.length,
			};

			logger(formattedArray);

			//Encode into mp3
			encoder.encode(formattedArray.channels);

			//When encoder has finished
			let compressed_blob = encoder.finish();

			logger(compressed_blob);

			logger(URL.createObjectURL(compressed_blob));

			callback(compressed_blob);
		});
	}
}
