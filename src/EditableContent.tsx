import React, { useEffect, useState, useRef } from 'react';
import { useKeyPress, useOnClickOutside } from './Utils';
import './index.css';
/*interface EditableContentProps {
    domElement,
    onSave,
    editOnClick: boolean,
    value: any
}*/

/* Use:
let editableParagraph = editable('p');
<editableParagraph value="this" />
*/
/*
function editable(WrappedComponent: Component) {
    return class extends Component implements Edits {

        state = {
            editing: false
        }

        edit = () => {
            this.setState({
                editing: true
            }, () => {
                this.domElement.focus();
            })
        };
        save = () => {
            this.setState({
                editing: false
            }, () => {
                if (this.props.onSave && this.isValueChanged()) {
                    console.log('Value is changed', this.domElement.textContent);
                }
            }
        };

        cancel = () => {
            this.setState({
                editing: false
            });
        };
        isValueChanged = () => {
            return this.props.value !== this.domElement.textContent;
        };

        handleKeyDown = (e: Event) => {
            const { key } = e;
            switch (key) {
                case 'Enter':
                case 'Escape':
                    this.save();
                    break;
            }
        }
        toggleEdit = (e: Event) => {
            e.stopPropagation();
            if (this.state.editing) {
                this.cancel();
            } else {
                this.edit();
            }
        }

        render() {
            let editOnClick = true;
            const { editing } = this.state;
            if (this.props.editOnClick !== null) {
                editOnClick = this.props.editOnClick;
            }
            return (
                <WrappedComponent
                    className={editing ? 'editing' : ''}
                    onClick={editOnClick ? this.toggleEdit : undefined}
                    contentEditable={editing}
                    ref={(domNode) => {
                        this.domElement = domNode
                    }}
                    onBlur={this.save}
                    onKeyDown={this.handleKeyDown}
                    {...this.props}>
                    {this.props.value}
                </WrappedComponent>
            )
        }
    }
}
*/

// Note: may need to sanitize input before saving
// TODO: look into DOM Purify
interface EditableContentProps {
    text: string;
    onSetText(value: string): void;
}

function EditableContent(props: EditableContentProps) {
    // With Hooks:
    const [isEditing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    // wrapping span node
    const wrapperRef = useRef(null);
    const textRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const enterEvent = useKeyPress('Enter');
    const escEvent = useKeyPress('Escape');

    // focus the cursor in the input field when editing starts
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    // watches for key presses and responds
    useEffect(() => {
        if (isEditing) {
            if (enterEvent) {
                props.onSetText(inputValue);
                setEditing(false);
            }
            if (escEvent) {
                setInputValue(props.text);
                setEditing(false);
            }
        }
    }, [enterEvent, escEvent]); // watch these key presses

    useOnClickOutside(wrapperRef, () => {
        // watches for clicks outside to save and close the editor
        if (isEditing) {
            props.onSetText(inputValue);
            setEditing(false);
        }
    });

    return (
        <span
            ref={wrapperRef}
            className="inline">
            <span
                ref={textRef}
                onClick={() => setEditing(true)}
                className={`inline inline--${!isEditing ? "active" : "hidden"}`}>
                {props.text}
            </span>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{ minWidth: Math.ceil(inputValue.length) + "ch" }}
                className={`inline-input inline-input--${isEditing ? "active" : "hidden"}`} />
        </span>
    );
}

export default EditableContent;


// http://omniscientjs.github.io/playground/01-inline-edit/#%2F%2F%20Shortcut%20for%20DOM-creation%0Avar%20d%20%3D%20React.DOM%3B%0A%0Avar%20FocusOnRender%20%3D%20%7B%0A%20%20componentDidMount%3A%20function%20()%20%7B%0A%20%20%20%20ReactDOM.findDOMNode(this).select()%3B%0A%20%20%7D%0A%7D%3B%0A%0Afunction%20onChange%20(item%2C%20e)%20%7B%0A%20%20item.update(function%20(state)%20%7B%0A%20%20%20%20return%20state.merge(%7B%20text%3A%20e.currentTarget.value%20%7D)%3B%0A%20%20%7D)%3B%0A%7D%0A%0A%2F%2F%20Auto-focusable%20component.%0Avar%20FocusingInput%20%3D%20component(FocusOnRender%2C%20function%20(%7B%20item%20%7D)%20%7B%0A%20%20return%20d.input(%7B%0A%20%20%20%20value%3A%20item.get('text')%2C%0A%20%20%20%20onChange%3A%20onChange.bind(null%2C%20item)%0A%20%20%7D)%3B%0A%7D)%3B%0A%0A%0A%2F%2F%20Regular%20React%20mixins%0Avar%20EditMixin%20%3D%20%7B%0A%0A%20%20getInitialState%3A%20function%20()%20%7B%0A%20%20%20%20return%20%7B%7D%3B%0A%20%20%7D%2C%0A%0A%20%20onEdit%3A%20function%20onEdit%20()%20%7B%0A%20%20%20%20this.setState(%7B%20editing%3A%20true%20%7D)%3B%0A%20%20%7D%2C%0A%0A%20%20onSubmit%3A%20function%20onSubmit%20(e)%20%7B%0A%20%20%20%20e.preventDefault()%3B%0A%20%20%20%20this.setState(%7B%20editing%3A%20false%20%7D)%3B%0A%20%20%7D%0A%7D%3B%0A%0A%2F%2F%20Add%20multiple%20mixins%20for%20handling%20editing%0Avar%20Editable%20%3D%20component(EditMixin%2C%20function%20(%7Bitem%7D)%20%7B%0A%20%20if%20(this.state.editing)%20%7B%0A%20%20%20%20return%20d.form(%7B%20onSubmit%3A%20this.onSubmit%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20FocusingInput(%7B%20item%20%7D)%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20d.button(%7B%7D%2C%20'Save'))%3B%0A%20%20%7D%0A%20%20return%20d.span(%7B%20onClick%3A%20this.onEdit%20%7D%2C%20item.get('text'))%3B%0A%7D)%3B%0A%0Avar%20Item%20%3D%20component(function%20(item)%20%7B%0A%20%20%2F%2F%20Compose%20Item%20and%20Editable%20components%0A%20%20return%20d.li(%7B%20style%3A%20%7B%20cursor%3A%20'pointer'%20%7D%20%7D%2C%20Editable(%7B%20item%3A%20item%20%7D))%3B%0A%7D)%3B%0A%0A%2F%2F%20Outer%20list%20with%20multiple%20items%0Avar%20List%20%3D%20component(function%20(items)%20%7B%0A%20%20%2F%2F%20Create%20Items%20for%20every%20element%20in%20list%20cursor%20is%20pointing%20to%0A%20%20return%20d.ul(%7B%7D%2C%20items.toArray().map(function%20(item%2C%20key)%20%7B%0A%20%20%20%20%2F%2F%20Create%20item%20as%20sub-component%20based%20on%20cursor%20%60item%60%0A%20%20%20%20return%20Item('item-'%20%2B%20key%2C%20item)%3B%0A%20%20%7D))%3B%0A%7D)%3B%0A%0A%2F%2F%20Create%20a%20immutable%20data%20structure%0Avar%20data%20%3D%20immstruct(%7B%0A%20%20items%3A%20%5B%0A%20%20%20%20%7B%20text%3A%20'one'%20%20%20%7D%2C%0A%20%20%20%20%7B%20text%3A%20'two'%20%20%20%7D%2C%0A%20%20%20%20%7B%20text%3A%20'three'%20%7D%0A%20%20%5D%0A%7D)%3B%0A%0A%2F%2F%20Render%20every%20time%20immutable%20data%20swaps.%0Adata.on('swap'%2C%20render)%3B%0A%0A%2F%2F%20Initial%20render%0Arender()%3B%0A%0Afunction%20render%20()%20%7B%0A%20%20ReactDOM.render(List(data.cursor('items'))%2C%20el)%3B%0A%7D%0A
// https://dev.to/joelmturner/build-an-inline-edit-text-input-with-react-hooks-4nah
// https://joelmturner.com/blog/inline-text-edit-react-hooks
