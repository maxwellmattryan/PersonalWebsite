Phantom is a phase distortion synthesizer plugin targeting VST3 and AU for MacOS and Windows platforms. It uses the unique method of _phase distortion synthesis_
to create sound and is capable of some truly bizarre sound design, which is really what makes it fun to use.

Phantom features over 50 different parameters for shaping and customizing the sound as well as advanced visual tools like a frequency spectrum visualizer and 
oscilloscope. It is built with the following components:

- **Oscillators**: generates a tunable sine wave capable of input modulation from either the LFOs or EGs
- **Phasors**: distorts the phase of the oscillator's sine wave according to different mathematical equations
- **Mixer**: mixes the signals from the two oscillator -> phasor chains, optionally applying ring modulation and noise effects
- **Filter**: standard multi-mode filter with resonance control, drive, and input modulation from an LFO and the filter EG 
- **Envelope Generators (EGs)**: shapes the ADSR envelopes for various synth parameters, namely amp (amplitude), phasor, filter, and an open mod
- **Low-Frequency Oscillators (LFOs)**: modulates various synth parameters, namely oscillators, phasors, and the filter, with sample and hold functionality
- **Amplifier**: controls the level of the overall output signal

Checkout the [GitHub](https://github.com/blackboxdsp/phantom){:target="_blank"} repository to see more!

Cheers!
