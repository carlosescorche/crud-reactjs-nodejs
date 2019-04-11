import React from 'react'

export default ({ color, size, className }) => (
    <svg width={size} height={size} viewBox="0 0 19 19" className={className}>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-863.000000, -301.000000)">
                <g transform="translate(135.000000, 255.000000)" id="TR-1">
                    <g transform="translate(0.000000, 39.000000)">
                        <g id="EDIT" transform="translate(725.000000, 7.000000)">
                            <g>
                                <g id="Group-15" transform="translate(11.595974, 10.722915) rotate(-315.000000) translate(-11.595974, -10.722915) translate(8.095974, -0.777085)">
                                    <rect id="Rectangle-20" stroke={color} x="0.5" y="0.5" width="5.28947268" height="18.69904" rx="1"></rect>
                                    <polygon id="Rectangle-20-Copy" fill={color} points="-4.97379915e-14 18.9845561 6.28947268 18.9845561 3.14473634 22.4792788"></polygon>
                                </g>
                                <path d="M18.5,6.5 L16.5,4.5" id="Line" stroke={color} strokeLinecap="square"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
)