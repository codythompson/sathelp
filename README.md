# sathelper

> A tool for calculating satellite transfer orbits in KSP.

One day I decided that I really wanted equidistant comm satellites in my kerbal space program game. I looked around and wasn't happy with the existing calculators, so I decided to build my own.

I had been meaning to get familiar with these new fangled JavaScript "frameworks" and half randomly settled on Vue. It seems to strike a nice balance between forcing you to use paradigms that help with scale, and letting you do what you want. Also, their docs are layed out in an easy to use way.

### TODO
In it's current state, this web app will tell you the apogee and perigee of a transfer orbit just for kerbin. It also has a big red square that I would like to one day be an animation of the satellites in orbit. These are the things I would like to do in the near future

- Add unit tests where possible.
- Add the missing values for the planets
- Add the moons
- Have the 'Orbit Viewer' do something a little more helpful
- add a unit switcher for the transfer orbit panel
- add an explanation of what this calculator is actually for
- add an instructions panel, complete with video tutorial

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
