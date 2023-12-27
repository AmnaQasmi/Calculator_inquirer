# chalk-animation

Colorful animations in terminal output


## Available animations

|   Name    |                   Preview                  |
|:---------:|:------------------------------------------:|
|  rainbow  | ![rainbow](http://i.imgur.com/napdxdn.gif) |
|   pulse   | ![pulse](http://i.imgur.com/xdaETwr.gif)   |
|   glitch  | ![glitch](http://i.imgur.com/834FJU1.gif)  |
|   radar   | ![radar](http://i.imgur.com/3bFrtRc.gif)   |
|    neon   | ![neon](http://i.imgur.com/YdAAroI.gif)    |
|  karaoke  | ![karaoke](https://i.imgur.com/lG7EF1t.gif)|


## Install

```bash
$ npm i @figliolia/chalk-animation
```


## Usage

```javascript
import { ChalkAnimation } from '@figliolia/chalk-animation';

ChalkAnimation.rainbow('Lorem ipsum dolor sit amet');
```

#### Start and stop

You can stop and resume an animation with `stop()` and `start()`.

When created, the instance of ChalkAnimation **starts automatically**.

```javascript
const rainbow = ChalkAnimation.rainbow('Lorem ipsum'); // Animation starts

setTimeout(() => {
    rainbow.stop(); // Animation stops
}, 1000);

setTimeout(() => {
    rainbow.start(); // Animation resumes
}, 2000);

```

#### Automatic stop

Anything printed to the console will stop the previous animation automatically

```javascript
ChalkAnimation.rainbow('Lorem ipsum');
setTimeout(() => {
    // Stop the 'Lorem ipsum' animation, then write on a new line.
    console.log('dolor sit amet');
}, 1000);
```

#### Changing speed

Change the animation speed using a second parameter. Should be greater than 0, default is 1.

```javascript
ChalkAnimation.rainbow('Lorem ipsum', 2); // Two times faster than default
```

#### Changing text

Change the animated text seamlessly with `replace()`

```javascript
let str = 'Loading...';
const rainbow = ChalkAnimation.rainbow(str);

// Add a new dot every second
setInterval(() => {
	rainbow.replace(str += '.');
}, 1000);
```

#### Manual rendering

Manually render frames with `render()`, or get the content of the next frame with `frame()`

```javascript
const rainbow = ChalkAnimation.rainbow('Lorem ipsum').stop(); // Don't start the animation

rainbow.render(); // Display the first frame

const frame = rainbow.frame(); // Get the second frame
console.log(frame);
```

## License

MIT © [Alex Figliolia](https://github.com/alexfigliolia)
