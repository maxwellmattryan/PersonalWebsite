INSERT INTO portfolio_profile_status(status) VALUES ('ACTIVE');
INSERT INTO portfolio_profile_status(status) VALUES ('INACTIVE');

INSERT INTO portfolio_profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Audio Development',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop software as it relates to audio, such as effect and synthesis plugins, digital signal processing, video game audio, microchips, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. I find its constraints to be fun and humbling, especially when coupled with my background in instrumental percussion and music production. Modifying digital signals of sound is an interesting concept that I find worth exploring.',
       'assets/images/portfolio/profiles/portrait.webp');
INSERT INTO portfolio_profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Game Development',
       'I write code and design audio for video games.',
       'I''m a software engineer based in Austin, TX. I enjoy developing games, whether it''s systems and mechanics or audio programming and technical sound design.',
       'I strive to develop both immersive audio and clean and neatly architectured code for video games. This pertains to things such as systems, mechanics, audio implementation, and more. I find the fact that each and every game is different is what makes the entire process so enjoyable and informative.',
       'assets/images/portfolio/profiles/portrait.webp');
INSERT INTO portfolio_profile(status_id, name, tagline, landing, about, image_url)
VALUES (1,
       'Software Engineering',
       'I develop fullstack applications for the cloud.',
       'I''m a software engineer based in Austin, TX. I love working on all sides of web development, whether it involves the front-end, back-end, database, or infrastructure.',
       'I strive to develop clean and neatly architectured software for the web. I have experience ranging from developing simple single-page applications to working in complex enterprise-level solutions within a functional programming paradigm. I enjoy the process of software development and learning new concepts that allow the product to come to fruition.',
       'assets/images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'C++', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'JUCE', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'C#', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'Unity', 4);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'FMOD Studio API', 5);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'FMOD Studio Low-level API', 6);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'MaxMSP / Max for Live', 7);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (1, 'Supercollider', 8);

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (2, 'C#', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (2, 'Unity', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (2, 'FMOD Studio API', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (2, 'FMOD Studio Low-level API', 4);

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'TypeScript', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'Angular', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'Scala', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'Play', 4);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'NestJS', 5);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'Node', 6);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'PostgreSQL', 7);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES (3, 'Google Cloud', 8);

INSERT INTO portfolio_project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Rotor',
       'Modern C++ ring modulation plugin',
       '[Rotor](https://github.com/maxwellmattryan/rotor) is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the JUCE framework for C++.

<br>

If you''re wanting to see the source for this plugin, check out the [GitHub repository](https://github.com/maxwellmattryan/rotor). In this example of the wavetable synthesis code, the "wavetable" is initialized in the header file with the body of the initialization contained in the cpp file:

<br>

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

<br>

Please feel free to checkout the [Google Drive folder](https://drive.google.com/drive/folders/1Vt5EhEqqlEPCf3kp-zyU0TGP6DlU1NL2?usp=sharing) and download the files you need to get started and use Rotor. Unfortunately at the moment, I do not have any builds available for VST, but the AU and VST3 builds work quite well!',
       'assets/images/portfolio/projects/rotor.webp',
       'Google Drive',
       'https://drive.google.com/drive/folders/1Vt5EhEqqlEPCf3kp-zyU0TGP6DlU1NL2?usp=sharing');

INSERT INTO portfolio_project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Counterplay',
       'Grid-based strategy game',
       '[Counterplay](https://maxwellmatt.itch.io/counterplay) is a team project for the class, Video Game Systems Design (AET 334M), that demonstrates a unique intersection of primary, secondary, and progression systems. The purpose of the class is to gain a perspective of how video game systems shape an entire game''s basis of gameplay through building an implementation.

<br>

In Counterplay, the primary systems involved feature grid-based combat and movement that involves around an environmental and character elemental form systems. The path-finding system uses a breadth-first search algorithm to find tiles within moving range for the character given the elemental form of that character. This is just an example of the system interaction at play within the game, but checkout the [GitHub repository](https://github.com/zero-sum-games/counterplay) to see more.

Here is an example of the movement for the generic "unit" type:

<br>

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class UnitMove : MonoBehaviour
{
    public enum MoveState
    {
        Idle        = 0,
        Selected    = 1,
        Moving      = 2,
        HasMoved    = 3
    }

    public MoveState state = MoveState.Idle;

    protected int _teamID;

    protected readonly List<Tile> _selectedTiles = new List<Tile>();
    private GameObject[] _tiles;

    protected readonly Stack<Tile> _path = new Stack<Tile>();
    protected Tile _currentTile;

    private float _movementBudget = 1.0f;
    public float speed = 2.0f;

    private Vector3 _velocity;
    private Vector3 _heading;

    private float _halfUnitHeight;

    protected void Init()
    {
        _tiles = GameObject.FindGameObjectsWithTag("Tile");
        _halfUnitHeight = GetComponent<Collider>().bounds.extents.y;

        _teamID = transform.parent.gameObject.GetComponent<TeamManager>().teamID;
    }

    //==========================================================================
    protected void FindAndSelectTiles()
    {
        ComputeAdjacencyLists();

        var process = new Queue<Tile>();

        _currentTile = GetCurrentTile();
        if (_currentTile == null) return;

        _currentTile.visited = true;
        _currentTile.SetActiveSelectors(false, false, true);

        process.Enqueue(_currentTile);

        while (process.Count > 0)
        {
            var t = process.Dequeue();

            if (t.GetMovementCost() > _movementBudget)
                continue;

            _selectedTiles.Add(t);

            if (t != _currentTile)
            {
                t.state = Tile.TileState.Selected;
                t.SetActiveSelectors(true, false, false);
            }

            foreach (var tile in t.adjMovementList.Where(tile => !tile.visited))
            {
                tile.parent = t;
                tile.visited = true;

                tile.CalculateMovementCostsPerTileType(this.GetComponent<PlayerState>().GetElementalState());
                tile.SetMovementCost(t.GetMovementCost());

                process.Enqueue(tile);
            }
        }
    }

    private void ComputeAdjacencyLists()
    {
        // for dynamically added / deleted tiles, make sure to reset tiles list object here
        foreach (var tile in _tiles)
        {
            var t = tile.GetComponent<Tile>();
            t.FindNeighbors(this.gameObject.GetComponent<PlayerState>().GetElementalState());
        }
    }

    public Tile GetCurrentTile()
    {
        Tile tile = null;

        if (Physics.Raycast(transform.position, Vector3.down, out var hit, 1))
            tile = hit.collider.GetComponent<Tile>();

        return tile;
    }

    //==========================================================================
    protected void Move()
    {
        if (_path.Count > 0)
        {
            var t = _path.Peek();

            // TODO: LeanTween here
            var target = t.transform.position;
            target.y += _halfUnitHeight + t.GetComponent<Collider>().bounds.extents.y;

            if (Vector3.Distance(transform.position, target) >= 0.05f)
            {
                SetHeading(target);
                SetHorizontalVelocity();

                var transform1 = transform;
                transform1.forward = _heading;
                transform1.position += _velocity * Time.deltaTime;

                transform.rotation = Quaternion.Euler(0.0f, 0.0f, 0.0f);
            }
            else
            {
                transform.position = target;
                _path.Pop();
            }
        }
        else
            state = MoveState.HasMoved;
    }

    private void SetHeading(Vector3 target)
    {
        _heading = target - transform.position;
        _heading.Normalize();
    }

    private void SetHorizontalVelocity()
    {
        _velocity = _heading * speed;
    }

    protected void MoveToTile(Tile tile)
    {
        _path.Clear();

        tile.state = Tile.TileState.Targeted;
        state = MoveState.Moving;

        ResetTiles();

        var next = tile;
        while (next != null)
        {
            _path.Push(next);
            next = next.parent;
        }
    }

    private void ResetTiles()
    {
        foreach (var tile in _tiles)
        {
            var t = tile.GetComponent<Tile>();
            t.state = Tile.TileState.Default;

            if (t == _currentTile)
                t.SetActiveSelectors(true, false, false);
            else
                t.SetActiveSelectors(false, false, false);
        }
    }

    protected void RemoveSelectedTiles()
    {
        foreach (var tile in _selectedTiles)
            if (tile != _currentTile)
            {
                tile.SetActiveSelectors(false, false, false);
                tile.Reset(true, false);
            }

        _selectedTiles.Clear();
    }
}
```',
       'assets/images/portfolio/projects/counterplay.webp',
       'GitHub',
       'https://github.com/zero-sum-games/counterplay');

INSERT INTO portfolio_project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Operation H.O.M.E.',
       'Arcade shooter made in Unity',
       '[Operation H.O.M.E.](https://maxwellmatt.itch.io/operation-home) ("Heck Off My Earth") is a simple arcade shooter created for the 2019 Global Game Jam. The theme of the jam was "home" and what it represents to you. Does home mean a location, sound, smell, or feeling? My team decided that for us it meant defending the Earth from invading aliens.

<br>

In this arcade-like shooter, you control the defenses and offensive attacks of the Earth. Waves of alien spaceships bombard the screen from the outside continuously and indefinitely closing in on the Earth to try and land an attack. You must save the planet by the shooting a laser at the spaceships to try and destroy them!

<br>

If you''re interested, you can checkout the [GitHub repository](https://github.com/maxwellmattryan/operation-home) for Operation H.O.M.E. I primarily worked on the sound design and implementation throughout the game.',
       'assets/images/portfolio/projects/operation-home.webp',
       'GitHub',
       'https://github.com/maxwellmattryan/operation-home');

INSERT INTO portfolio_project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Cozy Cat Cafe',
       'Mellow game for feeding cats',
       '[Cozy Cat Cafe](https://maxwellmatt.itch.io/cozy-cat-cafe) is an incredibly relaxing and chill game also created for the 2019 Global Game Jam where it won best of show. You indefinitely feed cats that appear on your patio doorstep in exchange for acorns. These acorns can be used to customize your kitchen by installing new walls or floors, hanging posters, and more.

<br>

In terms of sound design, the aesthetic is cute and bubbly. With the exception of the user interface sounds, the assets are all from real physical objects being recording including my cat, Luna. Please checkout this [demo video](https://drive.google.com/file/d/1ivh5BB1Jlz9HZb_u1Ja_G0IizKoSRd-Q/view?usp=sharing) to get an idea of what I''m talking about.',
       'assets/images/portfolio/projects/cozy-cat-cafe.webp',
       'GitHub',
       'https://github.com/VeryBester/Cozy-Cat-Cafe');

INSERT INTO portfolio_project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Green Foot',
       'ReactJS application that helps reduce carbon footprints',
       '[Green Foot](https://diversity-hackathon.github.io/greenfoot-frontend/#/) is an environmentally conscious app concerned with helping you lower your carbon footprint. Provided a starting and target location by the user, it returns a list of modes of transportation ranked in increasing order according to their carbon emission amount.

<br>

In terms of tech, Green Foot uses React and Redux for the frontend, Express and Node for the backend, and a Python-based environment for data. Because it was for a hackathon, the app uses GitHub pages and Heroku to deploy easily and simply. If you''re interested in checking out the source code, checkout the [GitHub repositories](https://github.com/Diversity-Hackathon).',
       'assets/images/portfolio/projects/green-foot.webp',
       'GitHub',
       'https://github.com/Diversity-Hackathon/greenfoot-frontend');

-- CAUTION: Make sure profile starter data is loaded before running
-- Audio Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES (1, 1), (1, 3), (1, 4);

-- Game Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES (2, 2), (2, 3), (2, 4);

-- Software Engineering
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES (3, 1), (3, 2), (3, 5);