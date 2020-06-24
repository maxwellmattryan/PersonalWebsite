Operation H.O.M.E. ('Heck Off My Earth') is a simple arcade shooter created for the 2019 Global Game Jam. The theme of the jam was 'home' and what it represents to you. Does home mean a location, sound, smell, or feeling? My team decided that for us it meant defending the Earth from invading aliens.

<br>

```
void RotorAudioProcessor::processBlock(AudioBuffer<float>& buffer, MidiBuffer& midiMessages)
{
    if (previousPulseWidth != *pulseWidth)
    {
        previousPulseWidth = *pulseWidth;
        setWavetable((int) *modulationShape);
    }

    if (previousShape != *modulationShape)
    {
        previousShape = *modulationShape;
        setWavetable((int) *modulationShape);
    }

    setPhaseDelta((double) *modulationRate, this->getSampleRate());

    modulationInversionFactor = getModulationInversion((bool) *modulationIsInverted);

    RotorAudioProcessorEditor* editor = static_cast<RotorAudioProcessorEditor*>(getActiveEditor());

    if (editor)
        editor->preAnalyzer->pushBuffer(buffer);

    for (auto sample = 0; sample < buffer.getNumSamples(); sample++)
    {
        currentPhase = previousPhase;

        auto* samples = buffer.getWritePointer(0);

        auto o_sampleData = samples[sample], p_sampleData = samples[sample];

        p_sampleData *= (wavetable[(int) currentPhase] * modulationInversionFactor);
        currentPhase = fmod(currentPhase + phaseDelta, wavetableSize);

        auto currentDryWet = *mix / 100.0f;

        p_sampleData *= currentDryWet;
        o_sampleData *= (1.0f - currentDryWet);

        auto n_sampleData = p_sampleData * Random::getSystemRandom().nextFloat();
        n_sampleData *= *modulationNoise;
        p_sampleData *= (1.0f - *modulationNoise);
        p_sampleData += n_sampleData;

        auto r_sampleData = p_sampleData + o_sampleData;

        for (auto channel = 0; channel < buffer.getNumChannels(); channel++)
            buffer.setSample(channel, sample, r_sampleData);

        previousPhase = currentPhase;
    }

    auto currentGain = powf(2, *level / 6);
    if (previousLevel == currentGain)
    {
        buffer.applyGain(currentGain);
    }
    else
    {
        buffer.applyGainRamp(0, buffer.getNumSamples(), previousLevel, currentGain);
        previousLevel = currentGain;
    }

    if (editor)
        editor->postAnalyzer->pushBuffer(buffer);
}
```

<br>
  
Rotor is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the [JUCE](https://juce.com/) framework for C++.

<br>
 
To see it in action, make sure to check out the [demo](https://drive.google.com/file/d/1szT238kz2ZAgqB3uCJYZRtq_IYkcSJrz/view?usp=sharing).

<br>
 
## Dependencies

<br>
 
- JUCE (v5.4.7)
- VST3 SDK (v3.6.14)

<br>
 
## Usage

<br>
 
Rotor is capable of running within any plugin host as long as it supports VST3 or AU. Please refer to your DAW's manual to see compatible plugin formats.

<br>
 
### Parameters

<br>
 
- __Shape__: Selects the waveform to use as the modulation signal. Included are sine, triangle, sawtooth, square, and noise waveforms. The plugin defaults to a sine wave.

<br>
 
- __Rate__: Changes the frequency of the modulation signal within the range of 10Hz to 12kHz. The default rate is 500Hz.

<br>
 
- __Noise__: Control amplitude of random noise from 0.0 to 1.0 (basically the noise's gain multiplier). The default value is 0.0, which is zero noise.

<br>
 
- __Pulse Width__: Determines the interval between the rise and fall of a pulse, most commonly associated with square waves. The default value is 0.5 resulting in an even pulsation. _This parameter only affects the square wave._

<br>
 
- __Invert__: Sets the inversion of the modulation signal, which can sometimes lead to interesting phase cancellations with the original input. The default is a non-inverted modulation.

<br>
 
- __Mix__: Adjusts the output signal's ratio between dry and wet. The default value is 50%.

<br>
 
- __Level__: Controls the final output level of the plugin. The default is set to 0.0dB.

<br>
 
## Contributing

<br>
 
Should you discover any bugs or undesirable behavior, please feel free to open an issue or submit a pull request. I am happy to accept them as long as they don't alter product direction, otherwise I am completely open to discuss any ideas that you may have regarding Rotor.

<br>
 
### Building

<br>
 
Rotor is built using the JUCE framework, which graciously provides project files for various IDEs.

<br>
 
For Windows users, simply navigate to `Builds/VisualStudio2019/Rotor.sln` then build either of the two available configurations. Similarly, OS X users may navigate to `Builds/MACOSX/Rotor.xcodeproj` and build using XCode.

<br>
 
If you have any issues building the plugin, please contact me or file an issue.