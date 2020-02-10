import { useState, useEffect, RefObject } from 'react';
import { Pair } from './Pair';
const uuid = require('uuid');

export enum ValueType {
    String,
    Number,
    Date,
    StringArray,
    NumberArray,
    DateArray,
    PairArray
}
export enum ValueTypeString {
    String = "String",
    Number = "Number",
    Date = "Date",
    StringArray = "Array of Strings",
    NumberArray = "Array of Numbers",
    DateArray = "Array of Dates",
    PairArray = "Array of Pairs"
}


export class Utils {
    static getValueTypeFromIndex(index: number): ValueType | undefined {
        switch (index) {
            case 0:
                return ValueType.String;
            case 1:
                return ValueType.Number;
            case 2:
                return ValueType.Date;
            case 3:
                return ValueType.StringArray;
            case 4:
                return ValueType.NumberArray;
            case 5:
                return ValueType.DateArray;
            case 6:
                return ValueType.PairArray;
            default:
                return undefined;

        }
    }

    static generateUID(): string {
        return uuid.v4();
    }

    static isPair(val: any): val is Pair {
        return (val as Pair).label != null;
    }

    static isBlank(val: string) {
        return val == null || val === '';
    }

    static getValueType(value: any): ValueType | null {
        if (value == null) {
            return null;
        }
        let type: string;
        let isArray = false;
        if (Array.isArray(value)) {
            type = typeof value[0];
            isArray = true;
        } else {
            type = typeof value;
        }
        switch (type) {
            case "string": {
                if (isArray) {
                    return ValueType.StringArray;
                }
                return ValueType.String;
            }
            case "number": {
                if (isArray) {
                    return ValueType.NumberArray;
                }
                return ValueType.Number;
            }
            default: {
                // Should be recognized as an object
                if (isArray && this.isPair(value)) {
                    return ValueType.PairArray;
                }

                if (value instanceof Date) {
                    if (isArray) {
                        return ValueType.DateArray;
                    }
                    return ValueType.Date;
                }
            }
        }
        return null;
    }

    static typeValidation(value: any, valueType: ValueType): boolean {
        return (this.getValueType(value) === valueType);
    }

    static sanitizeInput(value: any) {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    }

    static displayDate(value: any) {
        if (value instanceof Date) {

        }

        return value;
    }
}


// from Gabe Ragland's https://usehooks.com/useKeyPress/
export function useKeyPress(targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false);

    // If the key that was pressed is our target key, set to true
    function downHandler({ key }: { key: string }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    };
    // If the key that was released is our target key, set back to false
    function upHandler({ key }: { key: string }) {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Event Listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        }
    }, []); // Empty array means will only run on mount and unmount

    return keyPressed;
}

// from https://usehooks.com/useOnClickOutside/ 
/* It's worth noting that because passed in handler is a new function on every render,
 that will cause this effect callback/cleanup to run every render. 
 It's not a big deal, but to optimize you can wrap handler in useCallback before passing it into this hook.
 */
export function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T>, handler: (e: Event) => any) {
    useEffect(
        () => {
            const listener = (e: Event) => {
                // Do nothing if clicking ref's element or descendents
                if (!ref.current || ref.current.contains(e.target as Node)) {
                    return;
                }

                handler(e);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            // Cleanup
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }, [ref, handler] // Add ref and handler to effect dependencies


    );
}