import {useRef} from 'react';

const InputFocusMove = ({ className, onValueChange }) => {
    const inputsRef = useRef([]);

    const handleInputChange = (e, index) => {
        const currentValue = e.target.value.slice(0, 1); // Limit to 1 character

        // Update the value of the input in the ref
        inputsRef.current[index].value = currentValue;

        // Move focus to the next input if a character is entered
        if (currentValue.length === 1 && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }

        // Notify parent component of the updated value
        const updatedValue = inputsRef.current.map(input => input.value).join('');
        onValueChange(updatedValue);
    };

    return (
        <div className={`flex flex-row justify-between ${className}`} dir={`ltr`}>
            {Array.from({ length: 6 }).map((_, index) => (
                <input
                    type="number"
                    ref={(el) => (inputsRef.current[index] = el)} // Save reference to each input
                    onInput={(e) => handleInputChange(e, index)}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    maxLength="1"
                    key={index}
                    className="border-2 border-strokeGray text-2xl font-semibold rounded-lg min-w-10 max-w-12 flex-grow aspect-[3/4] h-auto bg-transparent text-center text-onBackground focus:outline-none focus:border-secondary"
                />
            ))}
        </div>
    );
};

export default InputFocusMove;

