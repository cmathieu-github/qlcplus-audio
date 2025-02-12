/*
  Q Light Controller Plus
  ballscolors.js

  Copyright (c) Rob Nieuwenhuizen

  Licensed under the Apache License, Version 2.0 (the 'License');
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0.txt

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an 'AS IS' BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

// Development tool access
var testAlgo;

(
  function () {
    var colorPalette = new Object;
    colorPalette.collection = new Array(
      ["White"        , 0xFFFFFF],	//  0
      ["Cream"        , 0xFFFF7F],	//  1
      ["Pink"         , 0xFF7F7F],	//  2
      ["Rose"         , 0x7F3F3F],	//  3
      ["Coral"        , 0x7F3F1F],	//  4
      ["Dim Red"      , 0x7F0000],	//  5
      ["Red"          , 0xFF0000],	//  6
      ["Orange"       , 0xFF3F00],	//  7
      ["Dim Orange"   , 0x7F1F00],	//  8
      ["Goldenrod"    , 0x7F3F00],	//  9
      ["Gold"         , 0xFF7F00],	// 10
      ["Yellow"       , 0xFFFF00],	// 11
      ["Dim Yellow"   , 0x7F7F00],	// 12
      ["Lime"         , 0x7FFF00],	// 13
      ["Pale Green"   , 0x3F7F00],	// 14
      ["Dim Green"    , 0x007F00],	// 15
      ["Green"        , 0x00FF00],	// 16
      ["Seafoam"      , 0x00FF3F],	// 17
      ["Turquoise"    , 0x007F3F],	// 18
      ["Teal"         , 0x007F7F],	// 19
      ["Cyan"         , 0x00FFFF],	// 20
      ["Electric Blue", 0x007FFF],	// 21
      ["Blue"         , 0x0000FF],	// 22
      ["Dim Blue"     , 0x00007F],	// 23
      ["Pale Blue"    , 0x1F1F7F],	// 24
      ["Indigo"       , 0x1F00BF],	// 25
      ["Purple"       , 0x3F00BF],	// 26
      ["Violet"       , 0x7F007F],	// 27
      ["Magenta"      , 0xFF00FF],	// 28
      ["Hot Pink"     , 0xFF003F],	// 29
      ["Deep Pink"    , 0x7F001F],	// 30
      ["Black"        , 0x000000]);	// 31

    colorPalette.makeSubArray = function (_index) {
      var _array = new Array();
      for (var i = 0; i < colorPalette.collection.length; i++) {
        _array.push(colorPalette.collection[i][_index]);
      }
      return _array;
    };
    colorPalette.names = colorPalette.makeSubArray(0);

    var algo = new Object;
    algo.apiVersion = 2;
    algo.name = "Balls (Colors)";
    algo.author = "Rob Nieuwenhuizen";
    algo.acceptColors = 0;
    algo.properties = new Array();
    algo.presetSize = 1;
    algo.properties.push("name:presetSize|type:range|display:Size|values:1,20|write:setSize|read:getSize");
    algo.presetNumber = 5;
    algo.properties.push("name:presetNumber|type:range|display:Number|values:1,5|write:setNumber|read:getNumber");
    algo.presetCollision = 0;
    algo.properties.push("name:presetCollision|type:list|display:Self Collision|values:No,Yes|write:setCollision|read:getCollision");
    algo.color1Index = 0;
    algo.properties.push(
      "name:color1Index|type:list|display:Color 1|" +
      "values:" + colorPalette.names.toString() + "|" +
      "write:setColor1|read:getColor1");
    algo.color2Index = 6;
    algo.properties.push(
      "name:color2Index|type:list|display:Color 2|" +
      "values:" + colorPalette.names.toString() + "|" +
      "write:setColor2|read:getColor2");
    algo.color3Index = 16;
    algo.properties.push(
      "name:color3Index|type:list|display:Color 3|" +
      "values:" + colorPalette.names.toString() + "|" +
      "write:setColor3|read:getColor3");
    algo.color4Index = 22;
    algo.properties.push(
      "name:color4Index|type:list|display:Color 4|" +
      "values:" + colorPalette.names.toString() + "|" +
      "write:setColor4|read:getColor4");
    algo.color5Index = 7;
    algo.properties.push(
      "name:color5Index|type:list|display:Color 5|" +
      "values:" + colorPalette.names.toString() + "|" +
      "write:setColor5|read:getColor5");
    algo.presetSize = 5;

    algo.colorIndex = new Array(
      algo.color1Index,
      algo.color2Index,
      algo.color3Index,
      algo.color4Index,
      algo.color5Index);

    var util = new Object;
    algo.initialized = false;

    algo.setSize = function (_size) {
      algo.presetSize = _size;
    };
    algo.getSize = function () {
      return algo.presetSize;
    };

    algo.setNumber = function (_step) {
      algo.presetNumber = _step;
      algo.initialized = false;
    };
    algo.getNumber = function () {
      return algo.presetNumber;
    };
    algo.setCollision = function (_colision) {
      if (_colision === "Yes") { algo.presetCollision = 0; }
      else if (_colision === "No") { algo.presetCollision = 1; }
    };
    algo.getCollision = function () {
      if (algo.presetCollision === 0) { return "Yes"; }
      else if (algo.presetCollision === 1) { return "No"; }
    };

    algo.setColor = function (_index, _preset) {
      var i = colorPalette.names.indexOf(_preset);
      if (i === -1) {
        i = (colorPalette.collection.length - 1);
      }
      algo.colorIndex[_index] = i;
      return algo.colorIndex[_index];
    };
    algo.getColor = function (_index) {
      var i = algo.colorIndex[_index];
      if (i < 0) { i = 0; }
      if (i >= colorPalette.collection.length) {
        i = (colorPalette.collection.length - 1);
      }
      return colorPalette.collection[i][0];
    };

    algo.setColor1 = function (_preset) {
      algo.color1Index = algo.setColor(0, _preset);
      algo.initialized = false;
    };
    algo.getColor1 = function () {
      return algo.getColor(0);
    };

    algo.setColor2 = function (_preset) {
      algo.color2Index = algo.setColor(1, _preset);
      algo.initialized = false;
    };
    algo.getColor2 = function () {
      return algo.getColor(1);
    };

    algo.setColor3 = function (_preset) {
      algo.color3Index = algo.setColor(2, _preset);
      algo.initialized = false;
    };
    algo.getColor3 = function () {
      return algo.getColor(2);
    };

    algo.setColor4 = function (_preset) {
      algo.color4Index = algo.setColor(3, _preset);
      algo.initialized = false;
    };
    algo.getColor4 = function () {
      return algo.getColor(3);
    };

    algo.setColor5 = function (_preset) {
      algo.color5Index = algo.setColor(4, _preset);
      algo.initialized = false;
    };
    algo.getColor5 = function () {
      return algo.getColor(4);
    };

    util.initialize = function (width, height) {
      algo.ball = new Array(algo.presetNumber);
      algo.direction = new Array(algo.presetNumber);
      algo.colour = new Array(algo.presetNumber);

      for (var i = 0; i < algo.presetNumber; i++) {
        var x = Math.random() * (width - 1); // set random start
        var y = Math.random() * (height - 1); // locations for balls
        algo.ball[i] = [y, x];
        var yDirection = (Math.random() * 2) - 1; // and random directions
        var xDirection = (Math.random() * 2) - 1;
        algo.direction[i] = [yDirection, xDirection];
        algo.colour[i] = colorPalette.collection[algo.colorIndex[i % algo.colorIndex.length]][1];
      }
      algo.initialized = true;
      return;
    };

    algo.rgbMap = function (width, height, rgb, progstep) {
      if (algo.initialized === false) {
        util.initialize(width, height);
      }
      var map = new Array(height);	// Clear map data
      for (var y = 0; y < height; y++) {
        map[y] = new Array();

        for (var x = 0; x < width; x++) {
          map[y][x] = 0;
        }
      }

      for (var i = 0; i < algo.presetNumber; i++) {  // for each ball displayed
        rgb = algo.colour[i];  // use RGB for ball random colour
        var r = (rgb >> 16) & 0x00FF;  // split colour in to
        var g = (rgb >> 8) & 0x00FF;   // separate parts
        var b = rgb & 0x00FF;
        var yx = algo.ball[i];  // ball's location, as float
        var step = algo.direction[i];  // ball's direction / speed, as float
        var my = Math.floor(yx[0]);  // workout closest map location for ball
        var mx = Math.floor(yx[1]);
        var boxSize = Math.round(algo.presetSize / 2);  // area size to draw ball

        for (var ry = my - boxSize; ry < my + boxSize + 2; ry++) {  // area for faded edges

          for (var rx = mx - boxSize; rx < mx + boxSize + 2; rx++) {  // to display ball

            if (rx < width && rx > -1 && ry < height && ry > -1) {  // if edges are off the map dont draw
              var pointRGB = map[ry][rx];	    // get curent colour on the map
              var pointr = (pointRGB >> 16) & 0x00FF;// so that colours mix and don't over
              var pointg = (pointRGB >> 8) & 0x00FF; // write.
              var pointb = pointRGB & 0x00FF;  // splt rgb in to components
              var ballr = r;
              var ballg = g;
              var ballb = b;
              var offx = rx - yx[1];  // calculate the off set differance of map location
              var offy = ry - yx[0];  // to the float location of the ball, using the hypotenuse
              var hyp = 1 - (Math.sqrt((offx * offx) + (offy * offy)) / ((algo.presetSize / 2) + 1));

              if (hyp < 0) { hyp = 0; } // if the distance multiplyed by ball size is negative = 0
              pointr += Math.round(ballr * hyp); // dim mapped ball colours by the distance from
              pointg += Math.round(ballg * hyp); // the ball center ( hyp = 1, full colour / 0, off)
              pointb += Math.round(ballb * hyp); // add the ball colour to the mapped location
              if (pointr > 255) { pointr = 255; } // if addind the colours over saturates
              if (pointg > 255) { pointg = 255; } // reduce it to the maximum
              if (pointb > 255) { pointb = 255; }

              pointRGB = (pointr << 16) + (pointg << 8) + pointb; // combine colours

              map[ry][rx] = pointRGB; // set mapped point
            }
          }
        }

        if (algo.presetCollision === 0) {  // if colision detection is on
          // Ball collision detection
          for (var ti = 0; ti < algo.presetNumber; ti++) {  // check all balls

            if (ti !== i) {  // but not the current one
              var disy = (yx[0] + step[0]) - algo.ball[ti][0];  // calculate distance
              var disx = (yx[1] + step[1]) - algo.ball[ti][1];  // to current ball
              var dish = Math.sqrt((disx * disx) + (disy * disy));
              if (dish < (1.414) * (algo.presetSize / 2)) {  // if to close
                var stepy = step[0];  // swap speed / direction of current ball
                var stepx = step[1];  // with ball that is to close
                algo.direction[i][0] = algo.direction[ti][0];
                algo.direction[i][1] = algo.direction[ti][1];
                algo.direction[ti][0] = stepy;
                algo.direction[ti][1] = stepx;
              }
            }
          }
        }

        // edge collision detection
        if (yx[0] <= 0 && step[0] < 0) { step[0] *= -1; } // top edge and moving up
        else if (yx[0] >= height - 1 && step[0] > 0) { step[0] *= -1; } // bottom edge and moving down

        if (yx[1] <= 0 && step[1] < 0) { step[1] *= -1; } // left edge and moving left
        else if (yx[1] >= width - 1 && step[1] > 0) { step[1] *= -1; } // right edge and moving right

        yx[0] += step[0]; // set ball's next location
        yx[1] += step[1];

        algo.ball[i] = yx; // update location
        algo.direction[i] = step; // and direction / speed
      }
      return map;
    };

    algo.rgbMapStepCount = function (width, height) {
      // This make no difference to the script ;-)
      return 2;
    };

    // Development tool access
    testAlgo = algo;

    return algo;
  }
)();
