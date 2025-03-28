import { 
    MouseSensor as LibMouseSensor, 
    TouchSensor as LibTouchSensor,
    PointerSensor as LibPointerSensor
} from '@dnd-kit/core'

function isInteractiveElement(element) {
    const interactiveElements = [
        'button',
        'input',
        'textarea',
        'select',
        'option'
    ]
  
    if (interactiveElements.includes(element.tagName.toLowerCase())) {
        return true
    }
  
    return false
}

export class PointerSensor extends LibPointerSensor {
    static activators = [
        {
            eventName: 'onPointerDown',
            handler: ({ nativeEvent: event }) => {
                if (
                    !event.isPrimary ||
                event.button !== 0 ||
                isInteractiveElement(event.target)
                ) {
                    return false
                }
    
                return true
            }
        }
    ]
}

export class TouchSensor extends LibTouchSensor {
    static activators = [
        {
            eventName: 'onTouchStart',
            handler: ({ nativeEvent: event }) => {
                if (
                    !event.isPrimary ||
                event.button !== 0 ||
                isInteractiveElement(event.target)
                ) {
                    return false
                }
    
                return true
            }
        }
    ]
}

export class MouseSensor extends LibMouseSensor {
    static activators = [
        {
            eventName: 'onMouseDown',
            handler: ({ nativeEvent: event }) => {
                if (
                    !event.isPrimary ||
                event.button !== 0 ||
                isInteractiveElement(event.target)
                ) {
                    return false
                }
    
                return true
            }
        }
    ]
}