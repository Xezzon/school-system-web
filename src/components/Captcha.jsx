import React from 'react';
const opentype = require('opentype.js');

const randint = (a = 1, b = 0) => Math.floor(Math.random() * a + b);

function Captcha({ width = 114, height = 32, codeLength = 4, strength = 3 }) {
    let [code, setCode] = React.useState([]);
    let [clicked, setClicked] = React.useState(0);

    React.useEffect(() => {
        setCode(Array.from({ length: codeLength }, () => randint(36).toString(36)));
    }, [clicked]);

    let handleClick = () => {
        setClicked(clicked + 1);
    };

    return (
        <svg width={width} height={height} onClick={handleClick}>
            <rect width="100%" height="100%" fill="#EEE" key={0} />
            <CaptchaSVG code={code} width={width} height={height} />
            <NoiseLineSVG num={strength} width={width} height={height} clicked={clicked} />
            <NoisePointSVG num={Math.floor(8 * Math.sqrt(strength))} width={width} height={height} clicked={clicked} />
        </svg>
    );
}

function CaptchaSVG({ code, width, height }) {
    let [font, setFont] = React.useState(null);
    let [captcha, setCaptcha] = React.useState([]);

    React.useEffect(() => {
        async function _draw() {
            if (font == null) {
                await opentype.load(
                    '//raw.staticdn.net/google/fonts/master/apache/robotomono/RobotoMono-Italic.ttf',
                    (err, f) => {
                        if (err) {
                            console.log(err);
                            alert('请确认网络是否正常');
                        } else {
                            setFont(f);
                        }
                    }
                );
            } else {
                let captcha = [];
                let spacing = (width - 2) / (code.length + 1);
                let fontSize = height - 2;
                let fontScale = fontSize / font.unitsPerEm;

                for (let i = 0, cnt = code.length; i < cnt; i++) {
                    let glyph = font.charToGlyph(code[i]);
                    let x = spacing * (i + 1);
                    let y = height / 2;
                    let left = x - (glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0) / 2;
                    let top = y + ((font.ascender + font.descender) * fontScale) / 2;

                    captcha.push(
                        <path d={glyph.getPath(left, top, fontSize).toPathData()} fill="#000" key={`1${i}`} />
                    );
                }
                setCaptcha(captcha);
            }
        }
        _draw();
    }, [code, font]);

    return <React.Fragment>{captcha}</React.Fragment>;
}

function NoiseLineSVG({ num, width, height, clicked }) {
    let [lines, setLine] = React.useState([]);

    React.useEffect(() => {
        let lines = [];
        for (let i = 0; i < num; i++) {
            let start = `${randint(20, 1)} ${randint(height - 2, 1)}`;
            let mid1 = `${randint(42, width / 2 - 21)} ${randint(height - 2, 1)}`;
            let mid2 = `${randint(42, width / 2 - 21)} ${randint(height - 2, 1)}`;
            let end = `${randint(20, width - 21)} ${randint(height - 2, 1)}`;
            lines.push(
                <path
                    d={`M${start} C${mid1},${mid2},${end}`}
                    fill="none"
                    stroke={`#${Math.random().toString(16).slice(-6)}`}
                    key={`3${i}`}
                />
            );
        }
        setLine(lines);
    }, [clicked]);

    return <React.Fragment>{lines}</React.Fragment>;
}

function NoisePointSVG({ num, width, height, clicked }) {
    let [points, setPoints] = React.useState([]);

    React.useEffect(() => {
        let points = [];
        for (let i = 0; i < num; i++) {
            points.push(
                <circle
                    cx={randint(width - 4, 2)}
                    cy={randint(height - 4, 2)}
                    r="2"
                    fill={`#${Math.random().toString(16).slice(-6)}`}
                    key={`2${i}`}
                />
            );
        }
        setPoints(points);
    }, [clicked]);

    return <React.Fragment>{points}</React.Fragment>;
}

Captcha = React.forwardRef(Captcha);

export default Captcha;
