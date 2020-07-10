import React from 'react';

class ArrayDetails extends React.Component {
    
    render() {
        return (
            <div className="ArrayDetails">
                <label>
                    Array Size:{` ${this.props.size} `}
                    <input 
                        name="size"
                        style={{width: '200px', margin: '10px'}}
                        type="range"
                        value={this.props.size}
                        onChange={this.props.onChange}
                    />
                </label>
                <button
                    onClick={this.props.onSubmit}
                    className="Btn"
                >
                    Render
                </button>
                <button
                    name="algo"
                    className={this.props.selAlgo === 'bubble sort' ? 'activeBtn' : 'Btn'}
                    value="bubble sort"
                    onClick={this.props.onChange}
                >
                    Bubble Sort
                </button>
                <button
                    name="algo"
                    className={this.props.selAlgo === 'insertion sort' ? 'activeBtn' : 'Btn'}
                    value="insertion sort"
                    onClick={this.props.onChange}
                >
                    Insertion Sort
                </button>
                <button
                    name="algo"
                    className={this.props.selAlgo === 'merge sort' ? 'activeBtn' : 'Btn'}
                    value="merge sort"
                    onClick={this.props.onChange}
                >
                    Merge Sort
                </button>
                <button
                    style={{width: '120px', padding: '5px', margin: '10px'}}
                    onClick={this.props.onClick}
                >
                    start sorting
                </button>
            </div>
        );
    }
}

export default ArrayDetails;
