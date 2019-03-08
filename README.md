# loading-layer

[![npm version](https://badge.fury.io/js/loading-layer.svg)](https://badge.fury.io/js/loading-layer)

Simple javascript spinner with dark semi transparent background to be used in js apps as an activity indicator.

![loading-layer demo image](./demo/loading-layer.gif?raw=true "loading-layer demo image")

## Quick start

### 1 Download and Install loading-layer

- yarn: **yarn add loading-layer**
- NPM: **npm install loading-layer**
- github: **https://github.com/ajsoriar/loading-layer**

### 2 Include dependences

2.1 loading-layer.js or loading-layer.min.js are under **dist** folder.

2.2 Include loading-layer.js or loading-layer.min.js, e.g.

```javascript
<link rel="stylesheet" href="../dist/loading-layer.min.css">
<script src="../dist/loading-layer.min.js"></script>
```

### 3 Use it

In your javascript code this way:

```javascript
<script>
    LL.show();
    LL.hide();
</script>
```

### 4 Development instructions

$ npm install

grunt build

### 4 License

loading-layer.js is [MIT licensed](./LICENSE).