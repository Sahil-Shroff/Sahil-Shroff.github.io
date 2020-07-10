import React from 'react';
import ArrayDetails from './ArrayDetails.js';
import ArrayCanvas from './ArrayCanvas.js';
import getBubbleSort from './Logic/BubbleSort';
import getInsertionSort from './Logic/InsertionSort.js'
import getMergeSort from './Logic/MergeSort.js'

class ArrayGraph extends React.Component {
  constructor(props) {
    super(props);
    this.timers = [];
    this.state = {
      size: 20,
      elements: [],
      active: {
        activeSwap: [],
        key: -1
      },
      algo: 'bubble sort'
    };

    this.animateBubbleSort = this.animateBubbleSort.bind(this);
    this.animateInsertionSort = this.animateInsertionSort.bind(this);
    this.animateMergeSort = this.animateMergeSort.bind(this);
    this.clearTimers = this.clearTimers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startSort = this.startSort.bind(this);
  }

  animateBubbleSort() {
    let array = this.state.elements.slice();
    let animations = [];
    let ANIMATION_SPEED = 3200 / (array.length + 1);
    getBubbleSort(array, animations);
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const timerOne = setTimeout(() => {
        const active = animation.comp;
        this.setState({
          active: {
            activeSwap: active,
            key: -1
          }
        });
      }, ANIMATION_SPEED * i);
      const timerTwo = setTimeout(() => {
        if (animation.swap.length) {
          const [one, two] = animation.swap;
          let arrayTemp = this.state.elements.slice();
          let temp = arrayTemp[one]; arrayTemp[one] = arrayTemp[two];
          arrayTemp[two] = temp;
          this.setState({ elements: arrayTemp });
        }
      }, ANIMATION_SPEED * (i + 1));
      this.timers.push(timerOne, timerTwo);
    }
  }

  animateInsertionSort() {
    let array = this.state.elements.slice();
    let animations = [];
    let ANIMATION_SPEED = 3200 / (array.length + 1);
    console.log(array);
    getInsertionSort(array, animations);
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      console.log(animation);
      if (animation.action === 'overwrite') {
        let [j, key] = animation.num;
        const timerOne = setTimeout(() => {
          this.setState({
            active: {
              activeSwap: [j, key],
              key: key
            }
          });
        }, ANIMATION_SPEED*i);
        const timerTwo = setTimeout(() => {
          let arrayTemp = this.state.elements.slice();
          arrayTemp[j + 1] = arrayTemp[j];
          this.setState({
            elements: arrayTemp
          });
        }, ANIMATION_SPEED*(i+1));
        this.timers.push(timerOne, timerTwo);
      } else {
        let [j, key] = animation.num;
        const timerOne = setTimeout(() => {
          this.setState({
            active: {
              activeSwap: [j, key],
              key: key
            }
          });
        }, ANIMATION_SPEED*i);
        const timerTwo = setTimeout(() => {
          let arrayTemp = this.state.elements.slice();
          arrayTemp[j] = key;
          this.setState({
            elements: arrayTemp
          });
        }, ANIMATION_SPEED*(i+1));
        this.timers.push(timerOne, timerTwo);
      }
    }
    const timer = setTimeout(() => {
      this.setState({
        active: {
          activeSwap: [],
          key: -1
        }
      });
    }, ANIMATION_SPEED*(animations.length + 1));
    this.timers.push(timer);
  }

  animateMergeSort() {
    let array = this.state.elements.slice();
    const ANIMATION_SPEED = 3200 / (array.length + 1);
    const animations = getMergeSort(array);
    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      let [iValue, jValue] = animation.num;
      if (animation.action === 'comp') {
        const timer = setTimeout(() => {
          this.setState({
            active: {
              activeSwap: [iValue, jValue],
              key: -1
            }
          });
        }, ANIMATION_SPEED*i);
        this.timers.push(timer);
      } else if (animation.action === 'write') {
        const timer = setTimeout(() => {
          let arrayTemp = this.state.elements.slice();
          arrayTemp[iValue] = jValue;
          this.setState({
            elements: arrayTemp
          });
        }, ANIMATION_SPEED*i);
        this.timers.push(timer);
      }  
    }
    const timer = setTimeout(() => {
      this.setState({
        active: {
          activeSwap: [],
          key: -1
        }
      });
    }, ANIMATION_SPEED*animations.length);
    this.timers.push(timer);
  }

  clearTimers() {
    this.setState({
      active: {
        activeSwap: [],
        key: -1
      }
    });
    for (let i = 0; i < this.timers.length; i++) {
      const timer = this.timers[i];
      clearTimeout(timer);
    }
    this.timers = [];
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.clearTimers();
    const num = this.state.size;
    let array = [];
    for (let i = 0; i < num; i++) {
      array.push((Math.min(Math.random() * 1000 + 20, 1000)) | 0);
    }
    this.setState({ elements: array });
  }

  startSort() {
    this.clearTimers();
    if (this.state.algo === 'bubble sort')
      this.animateBubbleSort();
    else if (this.state.algo === 'insertion sort')
      this.animateInsertionSort();
    else if (this.state.algo === 'merge sort')
      this.animateMergeSort();
  }

  render() {
    return (
      <div className="ArrayGraph">
        <ArrayDetails
          size={this.state.size}
          selAlgo={this.state.algo}
          onClick={this.startSort}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />
        <ArrayCanvas values={this.state.elements} cell={this.state.active} />
      </div>
    );
  }
}

export default ArrayGraph;
