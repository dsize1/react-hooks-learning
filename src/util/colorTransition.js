var hex2dec = function (hex) {
  return Number.parseInt(hex, 16)
}

var dec2hex = function (dec) {
  return Number.prototype.toString.call(dec, 16)
}

var rgb2hsl = function (rgb) {  
  var length = rgb.length
  if (length === 4 || length === 5) {
    rgb = rgb.split('').slice(1, 4).map((c) => hex2dec(c + c) / 255)
  } else if (length === 7 || length === 9){
    rgb = rgb.split('').slice(1, 7).reduce((re, ch, index) => {
      var i = Math.floor(index / 2) 
      if (index % 2 === 0) {
        re[i] = ch
      } else if (index % 2 === 1) {
        re[i] = hex2dec(re[i] + ch) / 255
      }

      return re
    }, [])
  }
  var red = rgb[0]
  var green = rgb[1]
  var blue = rgb[2]
  var max = Math.max(red, green, blue)
  var min = Math.min(red, green, blue)
  var diff = max - min
  var sum = max + min
  
  var lightness = 0.5 * sum
  
  var saturation 
  if (lightness === 0 || diff === 0) {
    saturation = 0
  } else if (lightness > 0 && lightness <= 0.5) {
    saturation = diff / 2 * lightness
  } else if (lightness > 0.5) {
    saturation = diff / (2 - 2 * lightness)
  }

  var hue
  if (diff === 0) {
    hue = 0
  } else if (max === red && green >= blue) {
    hue = (green - blue) / diff * 60 + 0 
  } else if (max === red && green < blue) {
    hue = (green - blue) / diff * 60 + 360
  } else if (max === green) {
    hue = (blue - red) / diff * 60 + 120
  } else if (max === blue) {
    hue = (red - green) / diff * 60 + 240
  }

  lightness = Math.round(lightness * 100)
  saturation = Math.round(saturation * 100) 
  hue = Math.round(hue)

  return [hue, saturation, lightness]
} 

var hsl2rgb = function (h, s, l) {
  s = s / 100
  l = l / 100
  var q 
  if (l < 0.5) {
    q = l * (1 + s)
  } else if (l >= 0.5) {
    q = l + s - (l * s)
  }
  var p = 2 * l - q
  var hK = h / 360
  var tRGB = [hK + 1/3, hK, hK - 1/3].map((tC) => {
    if (tC < 0) {
      tC = tC + 1.0
    } else if (tC > 1) {
      tC = tC - 1.0
    }
    return tC
  })

  var rgb = tRGB.map((tC) => {
    var color
    if (tC < 1/6) {
      color = p + ((q - p) * 6 * tC)
    } else if (tC >= 1/6 && tC < 0.5) {
      color = q
    } else if (tC >= 0.5 && tC < 2/3) {
      color = p + ((q - p) * 6 * (2/3 - tC))
    } else {
      color = p
    }
    color = Math.round(color * 255)
    return dec2hex(color).padStart(2, '0')
  })
  return rgb.join('')
}

var colorTransition = function (color) {
  var hsl = rgb2hsl(color)
  hsl[1] = 100
  hsl[2] = 90
  var converted = hsl2rgb(...hsl)

  var length = color.length
  if (length === 5) {
    converted = converted + color[4] + color[4]
  } else if (length === 9) {
    converted = converted + color.slice(7, 9)
  }
  return '#' + converted  
}

export default colorTransition