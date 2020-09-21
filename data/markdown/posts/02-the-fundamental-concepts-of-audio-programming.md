# What is Sound?

<br>

This is quite an interesting question to consider, especially when you start to think about how our ears work when they receive acoustic signals. In a physical sense, sound is a propagation of acoustic pressure waves that travel through the air, although can also travel through other gases or even liquids and solids. In a digital sense, these waves of pressure are transcoded into endless numbers of amplitude data in the time-domain.

<br>

These acoustic vibrations are present everywhere we go, and they are detected by our ears, technically the pinnae or the part that sticks out of the head. It serves the purpose of funneling the sound waves into our ear canals where the displacement acts to move the eardrum. When this eardrum moves it sends more pressure vibrations via a special set of bones to the cochlea, which is an organ that essentially transduces the physical vibrations into electrical pulses to be understood by our nervous system.

<br><br>

## Dynamic Range

<br>

_Dynamic range_ refers specifically to the range from the softest, quitest sound that a human can hear to the harshest, loudest sound threshold for human ears. The actual range is 120 decibels (dB), which because it is a logarithmic unit, represents a ratio of 1,000,000 to 1. We can think of normal conversations occuring at around 60dB whereas things like a jet or airplane taking off are at around 130dB - much too loud for our ears!

<br>

This all happens in those bones in our ear that are vibrated by the eardrum and are responsible for sending those vibrations along to the cochlea. In some evolutionarily extraordinary way, that set of bones is capable of adjusting themselves according to the intensity of the incoming signal's pressure. In other words, we have natural compressors in our ears!

<br><br>

## Frequency

<br>

_Frequency_ is technically defined as the number of times a repetitive event occurs in a given time period, where in audio, frequency measures things specifically in hertz or repetitions per second. For humans, our range of hearing begins at roughly 20Hz for lower tones extending all the way to 20KHz, which is also in a logarithmic scale. It is the reason for why an octave starting at 100Hz is only 100Hz higher (200Hz), but an octave from 1,600Hz is 3,200Hz. 

<br><br>

## Masking

<br>

One interesting phenomenon that our ears do is filter out frequency content from a signal based on content from that same signal. Broadly, _masking_ is the phenomenon when sounds that are louder and have more pressure cause quieter sounds to become less audible.

<br>

There are two types of masking, namely _frequency masking_ and _temporal masking_. The former refers to when an event with a relatively broadband characteristic meaning that it has rich and wide frequency content happens at a loud enough amplitude, sounds that consist of more localized frequency content will tend to become less audible. The latter is when sounds occur within a tight window of each other (typically 100ms or less) and begin to play with our perceptions.

<br><br>

## Spatialization

<br>

Evolutionarily speaking, humans have an incredible ability to detect the direction in which a sound is coming from, primarily due to the shape of our ears, ear canals, and head. Humans typically have two ears, which are essentially cues for the brain in detecting the difference of time of when the sound arrived to the two ears, otherwise known as the [_interaural time difference_](https://en.wikipedia.org/wiki/Interaural_time_difference) (ITD). Additionally, the [_head-related transfer function_](https://en.wikipedia.org/wiki/Head-related_transfer_function) (HRTF) describes the response characteristics of our ears reacting to sound from any point in space. Our brain uses frequency information based on how the sound was picked up by our ears and can infer directional information about the sound's source.

<br><br>

# Digital Representation of Audio

<br>

At some point we need to make a transition into the digital world of audio to talk about how things work here. There are a few things we need to understand conceptually before we can get started in writing any code.

<br><br>

## Pulse Code Modulation

<br>

_Pulse code modulation_ (PCM) is a standard form of digitally representing analog signals, such as audio. Put simply, a stream of PCM data has two properties for defining a sample rate or number of times that sample data is taken per second and also the bit depth, which is the number of possible digital values we can use to represent a sample's value.

<br><br>

## Sample Rate

<br>

In the real world, sound is what we hear as a result of continuous acoustic pressure waves. It would be nice if we could directly transfer this type of analog representation over to our computers and other machines, but we have to rely on sampling it and storing its information discretely at specific points in time each separated by a consistent interval. The [_sampling rate_](https://en.wikipedia.org/wiki/Sampling_(signal_processing)#Sampling_rate) refers to the rate in which we do that and plays an interesting role later on with the concept of latency, but I will discuss that later on when I talk about audio buffers.

<br>

<div class="post__image-container">
    <picture>
        <source srcset="assets/images/blog/02/sample-rate.webp" type="image/webp">
        <source srcset="assets/images/blog/02/sample-rate.png" type="image/png"> 
        <img class="post__image" alt="Sampling rate visually explained" src="assets/images/blog/02/sample-rate.png">
    </picture>
</div>

<br>

It is important to understand another concept by the name of the [Nyquist frequency](https://en.wikipedia.org/wiki/Nyquist_frequency), which put simply is a number that represents that highest frequency in an audio recording that can possibly be recorded given a certain sampling rate. For example if we wish to record sounds up to 20KHz, then must have the capability to record at the same speed of 40Khz at the very least. In this example 20KHz is our Nyquist frequency. An important thing to note is that while it seems pointless to use sampling rates above 44,100Hz, using significantly higher rates like 192,000Hz allow people like sound designers to pitchshift within a massive range without having to worry about frequency drop-offs. For example, if a producer is shifting a sample downwards something around 20KHz then having higher frequencies embedded into the recording thanks to the high sample rate then we end up utilizing a portion of those so that we still have sound content left.

<br>

The reason why this happens is that the acoustic pressure waves being sampled have both positive and negative components that need to be accounted for. If that is disregarded, then a phenomenon called [aliasing](https://en.wikipedia.org/wiki/Aliasing) occurs, which is where the higher frequencies whose positive and negative components aren't sampled fast enough, so the reconstructed signal is simply not accurate or true to the original recording thus resulting in something close to what it should be but not exactly.

<br><br>

## Bit Depth

<br>

The concept called [bit depth](https://en.wikipedia.org/wiki/Audio_bit_depth) refers to the idea of quantizing the amplitude values of a given audio signal, typically into a range of values to the magnitude of 2<sup>16</sup> or 2<sup>24</sup>, equating to 65,536 and 16,777,216 values respectively. Humans typically can't hear to a degree finer than that like 16-bit audio, but it's important to note that bit-depths like 2<sup>32</sup> allow us to adjust audio levels up or down in such a high resolution that no added distortion or extra noise occurs.

<br>

<div class="post__image-container">
    <picture>
        <source srcset="assets/images/blog/02/bit-depth.webp" type="image/webp">
        <source srcset="assets/images/blog/02/bit-depth.png" type="image/png"> 
        <img class="post__image" alt="Bit depth visually explained" src="assets/images/blog/02/bit-depth.png">
    </picture>
</div>

<br>

The image above shows the audio data within a range of -1.0f and 1.0f, which touches on an important convention when working with digital audio - we use different scales to represent the same data. Some conventions use an unsigned float or integer approach that would typically have 2<sup>16</sup> or 2<sup>24</sup> values between 0.0f and 1.0f or 0 and 65,535, while others would use a signed float or integer.

<br>

For example audio programming dealing with digital signal processing calculations, it is much easier for us to perform the mathematics using normalized values between 0.0f and 1.0f because multiplying any amount of numbers from this range will never result in a number outside this range. Using the range of -1.0f to 1.0f is also friendly for multiplication for the same reason, namely that the product of any two values in this range will _always_ fall within the respective range. In the case of modulating an input signal with some other audio source, we multiply the two values from the two sample points with each other to effectively apply the modulation against the input. When we want to apply an envelope to our amplitude, we can simply multiply two values together because we are trusting that they are normalized values.

<br>

In another example, the `.mp3` file format, as mentioned in [Designing Audio Effect Plugins in C++](https://www.amazon.com/Designing-Audio-Effect-Plugins-C/dp/1138591939/ref=pd_lpo_14_img_0/130-1046571-9315151?_encoding=UTF8&pd_rd_i=1138591939&pd_rd_r=990ddf1a-ea23-42db-b554-eb972a07124f&pd_rd_w=qHtcJ&pd_rd_wg=9PrjI&pf_rd_p=7b36d496-f366-4631-94d3-61b87b52511b&pf_rd_r=JY4GV1P7CZTYPKFVKDYV&psc=1&refRID=JY4GV1P7CZTYPKFVKDYV), uses integers to form the PCM data. When using intergers there is a catch that while the negative side uses (in the case of 2<sup>16</sup>) all 32,768 values up to -32,768, we account for zero when counting upwards so the positive half only extends to 32,767. This isn't typically anything to worry about especially when writing more matchematical and procedural code for digital signals because can mostly get away with thinking about numbers between -1.0f and 1.0f or 0.0f and 1.0f, but it is important to know nonetheless.

<br><br>

## Reconstruction

<br>

At some point, our bitstream of audio data is decoded and converted into the corresponding analog counterparts of those impulses. Because we are using sample points taken at discrete points in time, there are technically missing bits of information between them. To solve that problem it is common to use the `sinc()` function, which corresponds mathematically to `f(x) = sin(x) / x`. It helps us to simulate impulses fill in the data between them, but does so where the responses all add up linearly, which happens because they are all overlapping with each other.

<br>

<div class="post__image-container">
    <picture>
        <source srcset="assets/images/blog/02/reconstruction-func.webp" type="image/webp">
        <source srcset="assets/images/blog/02/reconstruction-func.png" type="image/png"> 
        <img class="post__image" alt="Sample reconstruction function" src="assets/images/blog/02/reconstruction-func.png">
    </picture>
</div>

<br><br>

# Audio Buffers

<br>

## Callback

<br>

The _audio callback_ is an important concept to learn about, especially when learning to design and develop audio software, in which optimized and performant programming is a must. This callback refers to the computer reading the audio buffer out to the digital to analog converters (DAC) at a consistent time dependent upon the size of the buffer. Buffer sizes are typically like 256 or 512 samples, which at a sample rate of 44,100 is just 5.8ms and 11.6ms respectively. This means that every 5.8ms, the code you write has to be efficient enough to have calculated the mathematics needed to for your effect, synthesizer, plugin, etc.

<br>

_<span class='text--warn'>WARNING: </span><span class='text--warn-paragraph'>This callback occurs whether or not the buffer is filled. It is imperative that you guarantee that the code is written in time. Audio is unique in that we don't just care about the average throughput of our processing - we care about the minimal performance because we can NEVER afford to have dropouts (see "Real-time Constraints" below).</span>_

<br><br>

## What is a Data Buffer?

<br>

In short, a [_data buffer_](https://en.wikipedia.org/wiki/Data_buffer) is a physical allocation of memory that is used to temporarily house data while it is typically either being written to or read from. We can implement buffers both by physical means like a configured fixed location in our memory's hardware and by virtual means, which usually has software pointing at locations still corresponding to physical locations in memory. One important benefit of using data from memory is that we can read and write nominally faster than if it was being stored on the disk or from a network typically.

<br><br>

## Circular Buffers

<br>

Audio buffers are usually implemented as [_circular buffers_](https://en.wikipedia.org/wiki/Circular_buffer), otherwise known as ring buffers, which are each a data structure of a fixed size where its tail leads to its head. These are ideal for circumstances where we know that the buffer size will always remain fixed, because we never have to spend precious cycles reallocating a larger ring buffer - all of its memory is created and consumed sequentially 100% of the time along with its size being fixed. In this implementation we read from the head pointer and overwrite existing spaces in order after it has been read.

<br><br>

## Double Buffers

<br>

Double buffers, sometimes referred to and implemented as multiple buffers, is simply the idea of reading to and writing from two or more buffers simultaneously. In this setup, we are reading audio sample data from one buffer while writing to another, then we rinse and repeat with the other buffer being read from while the original one we read is being written to.

<br><br>

## Buffer Size

<br>

The size of the audio buffer is quite important when looking at things like latency and audio dropouts. The audio buffer size is the amount of samples that are within one audio buffer at one time. This affects things like live performance because if you are playing keys along to the music and the buffers are large enough to take a certain amount of time, they musician or performer will experience latency problems that really detach them from the live experience and make it difficult to perform well.

<br><br>

## Real-time Constraints

<br>

This alone is a considerable big topic to discuss because there are multiple ways of working around the constraints, which of them the the biggest is writing code fast enough to write sample data to the audio buffer within the amount of time that it's been alotted on the audio thread. In C++ specifically, this means that we do not have the time to afford copying buffer data over and over again throughout functions as we operate mathematically upon the data. We have to pass by reference or pointer because this is the only thing we really can afford to do while still being able to perform complex digital signal process algorithms and operations on them.

<br>

Unfortunately there are also consequences for not writing to this audio buffer timely. The biggest problem is called an audio dropout, which is where the audio buffer contains null data because it was not written to fast enough resulting an immediately perceptive lack of audio in the output in addition to a sometimes harsh, loud, and short clicking sound. Consider this in a live DJ performance where the DJ, using audio software on his laptop connected to a controller for mixing the music, needs to produce a continuous signal of music. If there is a dropout on systems driving that much power, those dropouts will be far too loud for people, especially those not wearing any ear protection. 

<br>

There are more technically specific constraints as well such as lock-free threading, memory allocation and alignment, single-instruction and multiple-data (SIMD) implementation, and more, but I am saving those for another blog post.

<br><br>

# Digital Signal Processing

<br>

[_Digital signal processing_](https://en.wikipedia.org/wiki/Digital_signal_processing) (DSP) is a huge field that focuses on the application and study of processing digital signals typically created by computers that represent often continuous real-world data that can be in the time, space, or frequency domain. This includes all of the things we producers, composers, and sound designers know and love called audio effects, which can be things like equalization, compression, filtering, delay, reverb, ring modulation, and so many more.

<br>

It's important to mention that DSP is not limited to audio. Engineers, mathematicians, and scientists use it in all sorts of fields where reading some stream of data is common, namely machine learning, telecommunication, data compression, and other real-time computational fields. In terms of audio, it can give us an incredible freedom not just as developers but as general artists making some fun and creative.

<br>

Thank you for checking out this blog post! Please read more at my [blog page](https://mattmaxwell.dev/blog) or checkout the plugin that I built, [Rotor](https://drive.google.com/drive/folders/1Vt5EhEqqlEPCf3kp-zyU0TGP6DlU1NL2?usp=sharing), to see these concepts in action or <a href='assets/plugins/rotor.zip' download='rotor.zip'>download the plugin</a>. Cheers!