import React, {Component} from 'react';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const FULL_RADIUS = 50;
const CENTER_X = 50;
const CENTER_Y = 50;

export default class CircularProgressBar extends Component {
    state = {
        percentage: this.props.percentage
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.percentage != prevState.percentage) {
            return {
                percentage: nextProps.percentage
            }
        }
        return null;
    }

    getPathRadius() {
        return FULL_RADIUS - (this.props.strokeWidth /2 );
    }

    //a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
    //"M 50 50 m -46, 0 a 46,46 0 1,0 92,0"
    getArcPath(cx, cy, r) {
        let path = `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1, 1 ${r*2},0 a ${r},${r} 0 1, 1 -${r*2},0`;
        return path;
    }

    getProgressStyle (percentage=this.state.percentage) {
        let radius = this.getPathRadius() - this.props.progressOffset;
        const diameter = Math.PI * 2 * radius;
        const percentRoundOff = Math.min(Math.max(percentage, MIN_PERCENTAGE), MAX_PERCENTAGE);
        const dashoffset = ((100 - percentRoundOff) /100) * diameter;

        return{
            strokeDasharray: `${diameter}px ${diameter}px`,
            strokeDashoffset: `${dashoffset}px`
        }
    }


    render() {
        let {percentage} = this.state;
        let {className, textForPercentage, strokeWidth} = this.props;
        let classNameToken = className.split("-");
        let textClassName = 'progress-text progess-text-' + classNameToken[1];
        let radius = this.getPathRadius();
        let progressRadius = radius - this.props.progressOffset;

        const text = textForPercentage(percentage);

        return (
            <svg viewBox="0 0 100 100">
                <g>
                    <circle stroke="lightgray"
                        strokeWidth={strokeWidth}
                        fill="none"
                        cx={CENTER_X}
                        cy={CENTER_Y}
                        r = {radius}
                    />

                    <path
                        d = {this.getArcPath(CENTER_X, CENTER_Y, progressRadius)}
                        className={className + " progress"}
                        stroke={this.props.color}
                        strokeWidth = {strokeWidth}
                        fillOpacity={1}
                        fill="none"
                        style={this.getProgressStyle()}
                    />

                    <text className={textClassName}
                        fill={this.props.color}
                        x={CENTER_X-15}
                        y={CENTER_Y+5}>
                        {text}
                    </text>

                </g>
            </svg>
        )
    }
}

CircularProgressBar.defaultProps = {
    strokeWidth:8,
    progressOffset: 0,
    textForPercentage: (percentage) => `${percentage}%`,
    color: '#42C0FB',
    className: ""
}
