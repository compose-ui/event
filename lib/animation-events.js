var cssAnimEventTypes = getAnimationEventTypes()
var supported         = cssAnimEventTypes.animationstart !== undefined

module.exports = {
  transform: transformAnimationEvents,
  supported: supported
}

function camelCaseEventTypes(prefix) {
  prefix = prefix || '';

  return {
    animationstart: prefix + 'AnimationStart',
    animationend: prefix + 'AnimationEnd',
    animationiteration: prefix + 'AnimationIteration'
  };
}

function lowerCaseEventTypes(prefix) {
  prefix = prefix || '';

  return {
    animationstart: prefix + 'animationstart',
    animationend: prefix + 'animationend',
    animationiteration: prefix + 'animationiteration'
  };
}

/**
 * @return {Object} Animation event types {animationstart, animationend, animationiteration}
 */

function getAnimationEventTypes() {
  if ( !document ) return {}

  var prefixes = ['webkit', 'Moz', 'O', ''];
  var style = document.documentElement.style;

  // browser compliant
  if (undefined !== style.animationName) {
    return lowerCaseEventTypes();
  }

  for (var i = 0, len = prefixes.length, prefix; i < len; i++) {
    prefix = prefixes[i];

    if (undefined !== style[prefix + 'AnimationName']) {
      // Webkit
      if (0 === i) {
        return camelCaseEventTypes(prefix.toLowerCase());
      }
      // Mozilla
      else if (1 === i) {
        return lowerCaseEventTypes();
      }
      // Opera
      else if (2 === i) {
        return lowerCaseEventTypes(prefix.toLowerCase());
      }
    }
  }

  return {};
}


// Adds necessary add vendor prefixes or camelCased event names
//
function transformAnimationEvents (event) {
  if (!event.match(/animation/i)) {
    return event
  } else {
    if (cssAnimEventTypes[event]) {
      return cssAnimEventTypes[event]
    } else {
      if(window.env != 'test') {
        console.error('"' + event + '" is not a supported animation event')
      }
      return ''
    }
  }
}
