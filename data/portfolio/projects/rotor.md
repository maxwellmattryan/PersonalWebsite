Rotor is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the JUCE framework for C++.

If you're wanting to see the source for this plugin, check out the [GitHub repository](https://github.com/blackboxdsp/rotor){:target="_blank"}. In this example of the wavetable synthesis code, the "wavetable" is initialized in the header file with the body of the initialization contained in the cpp file:

```cpp
// RotorAudioProcessor.h
Array<float> wavetable;
int wavetableSize;
double currentPhase = 0.0;
double previousPhase = 0.0;
double phaseDelta = 0.0;

// RotorAudioProcessor.cpp
void RotorAudioProcessor::setWavetable(int waveformIndex)
{
    wavetable.clear();

    int pulseWidthSize = *pulseWidth * wavetableSize;

    switch (waveformIndex)
    {
        // Sine
        default:
        case 0:
            for (int i = 0; i < wavetableSize; i++)
            {
                auto waveformValue = 0.5f + 0.5f * sinf(MathConstants<float>::twoPi * (float) i / wavetableSize);
                wavetable.insert(i, waveformValue);
            }
            break;

        // Triangle
        case 1:
            for (int i = 0; i < wavetableSize / 2; i++)
            {
                float waveformValue = (float) i / (wavetableSize / 2);
                wavetable.insert(i, waveformValue);
            }
            for (int i = wavetableSize / 2; i < wavetableSize; i++)
            {
                wavetable.insert(i, wavetable[-1 * (i + 1)]);
            }
            break;

        // Saw-tooth
        case 2:
            for (int i = 0; i < wavetableSize; i++)
            {
                float waveformValue = (float) i / wavetableSize;
                wavetable.insert(i, waveformValue);
            }
            break;

        // Square
        case 3:
            for (int i = 0; i < pulseWidthSize; i++)
            {
                wavetable.insert(i, 1.0f);
            }
            for (int i = pulseWidthSize; i < wavetableSize; i++)
            {
                wavetable.insert(i, 0.0f);
            }
            break;

        // Semi-sine
        case 4:
            for (int i = 0; i < wavetableSize; i++)
            {
                auto waveformValue = sinf(MathConstants<float>::pi * (float) i / wavetableSize);
                wavetable.insert(i, waveformValue);
            }
            break;
    }
}
```

Please checkout the [Google Drive folder](https://drive.google.com/drive/folders/1Vt5EhEqqlEPCf3kp-zyU0TGP6DlU1NL2?usp=sharing){:target="_blank"} and download the files you need to get started and use Rotor. Unfortunately at the moment, I do not have any builds available for VST, but the AU and VST3 builds work quite well!
