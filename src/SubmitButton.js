import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({ status }) => {
  const isSent = status === 'success';
  const isSending = status === 'sending';

  return (
    <StyledWrapper>
      <button type="submit" disabled={isSending} className={`button ${isSent ? 'is-sent' : ''}`}>
        <div className="outline" />
        <div className="state state--default">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="1em" width="1em">
              <g style={{filter: 'url(#shadow)'}}>
                <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
              </g>
              <defs>
                <filter id="shadow">
                  <feDropShadow floodOpacity="0.5" stdDeviation="0.6" dy={1} dx={0} />
                </filter>
              </defs>
            </svg>
          </div>
          <p>
            <span style={{'--i': 0}}>S</span>
            <span style={{'--i': 1}}>u</span>
            <span style={{'--i': 2}}>b</span>
            <span style={{'--i': 3}}>m</span>
            <span style={{'--i': 4}}>i</span>
            <span style={{'--i': 5}}>t</span>
          </p>
        </div>
        <div className="state state--sent">
          <div className="icon">
            <svg stroke="black" strokeWidth="0.5px" width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g style={{filter: 'url(#shadow)'}}>
                <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="currentColor" />
                <path d="M10.5795 15.5801C10.3795 15.5801 10.1895 15.5001 10.0495 15.3601L7.21945 12.5301C6.92945 12.2401 6.92945 11.7601 7.21945 11.4701C7.50945 11.1801 7.98945 11.1801 8.27945 11.4701L10.5795 13.7701L15.7195 8.6301C16.0095 8.3401 16.4895 8.3401 16.7795 8.6301C17.0695 8.9201 17.0695 9.4001 16.7795 9.6901L11.1095 15.3601C10.9695 15.5001 10.7795 15.5801 10.5795 15.5801Z" fill="currentColor" />
              </g>
            </svg>
          </div>
          <p>
            <span style={{'--i': 5}}>S</span>
            <span style={{'--i': 6}}>u</span>
            <span style={{'--i': 7}}>b</span>
            <span style={{'--i': 8}}>m</span>
            <span style={{'--i': 9}}>i</span>
            <span style={{'--i': 10}}>t</span>
            <span style={{'--i': 11}}>t</span>
            <span style={{'--i': 12}}>e</span>
            <span style={{'--i': 13}}>d</span>
          </p>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;

  .button {
    --primary: #8255ff; /* Accent color */
    --neutral-1: #2e2e2e; /* Dark background */
    --neutral-2: #1a1a1a; /* Darker background */
    --radius: 14px;

    cursor: pointer;
    border-radius: var(--radius);
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow:
      0 0.5px 0.5px 1px rgba(0, 0, 0, 0.2),
      0 10px 20px rgba(0, 0, 0, 0.2),
      0 4px 5px 0px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.3s ease;
    min-width: 200px;
    padding: 20px;
    height: 68px;
    font-family: "Galano Grotesque", Poppins, Montserrat, sans-serif;
    font-style: normal;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff; /* Text color */
    background: var(--neutral-1); /* Button background */
  }
  .button:hover {
    transform: scale(1.02);
    box-shadow:
      0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 15px 30px rgba(0, 0, 0, 0.3),
      0 10px 3px -3px rgba(0, 0, 0, 0.04);
  }
  .button:active {
    transform: scale(1);
    box-shadow:
      0 0 1px 2px rgba(255, 255, 255, 0.3),
      0 10px 3px -3px rgba(0, 0, 0, 0.2);
  }
  .button:after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    border: 2.5px solid transparent;
    background:
      linear-gradient(var(--neutral-1), var(--neutral-2)) padding-box,
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45))
        border-box;
    z-index: 0;
    transition: all 0.4s ease;
  }
  .button:hover::after {
    transform: scale(1.05, 1.1);
    box-shadow: inset 0 -1px 3px 0 rgba(50, 50, 50, 1); /* Adjusted shine colour to a darker tone */
  }

  .button::before {
    content: "";
    inset: 7px 6px 6px 6px;
    position: absolute;
    background: linear-gradient(to top, var(--neutral-1), var(--neutral-2));
    border-radius: 30px;
    filter: blur(0.5px);
    z-index: 2;
  }
  .state p {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .state .icon {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    transform: scale(1.25);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .state .icon svg {
    overflow: visible;
  }

  /* Outline */
  .outline {
    position: absolute;
    border-radius: inherit;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.4s ease;
    inset: -2px -3.5px;
  }
  .outline::before {
    content: "";
    position: absolute;
    inset: -100%;
    background: conic-gradient(
      from 180deg,
      transparent 60%,
      rgb(22, 22, 22) 80%,
      transparent 100%
    );
    animation: spin 2s linear infinite;
    animation-play-state: paused;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .button:hover .outline {
    opacity: 1;
  }
  .button:hover .outline::before {
    animation-play-state: running;
  }

  /* Letters */
  .state p span {
    display: block;
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.03s);
  }
  .button:hover p span {
    opacity: 1;
    animation: wave 0.5s ease forwards calc(var(--i) * 0.02s);
  }
  .button.is-sent p span {
    opacity: 1;
    animation: disapear 0.6s ease forwards calc(var(--i) * 0.03s);
  }
  @keyframes wave {
    30% {
      opacity: 1;
      transform: translateY(4px) translateX(0) rotate(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px) translateX(0) rotate(0);
      color: var(--primary);
    }
    100% {
      opacity: 1;
      transform: translateY(0) translateX(0) rotate(0);
    }
  }
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(-20px) translateX(5px) rotate(-90deg);
      color: var(--primary);
      filter: blur(5px);
    }
    30% {
      opacity: 1;
      transform: translateY(4px) translateX(0) rotate(0);
      filter: blur(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-3px) translateX(0) rotate(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) translateX(0) rotate(0);
    }
  }
  @keyframes disapear {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(5px) translateY(20px);
      color: var(--primary);
      filter: blur(5px);
    }
  }

  /* Plane */
  .state--default .icon svg {
    animation: land 0.6s ease forwards;
  }
  .button:hover .state--default .icon {
    transform: rotate(90deg) scale(1.25);
  }
  .button.is-sent .state--default svg {
    animation: takeOff 0.8s linear forwards;
  }
  .button.is-sent .state--default .icon {
    transform: rotate(0deg) scale(1.25);
  }
  @keyframes takeOff {
    0% {
      opacity: 1;
    }
    60% {
      opacity: 1;
      transform: translateX(70px) rotate(90deg) scale(2);
    }
    100% {
      opacity: 0;
      transform: translateX(160px) rotate(90deg) scale(0);
    }
  }
  @keyframes land {
    0% {
      transform: translateX(-60px) translateY(30px) rotate(-50deg) scale(2);
      opacity: 0;
      filter: blur(3px);
    }
    100% {
      transform: translateX(0) translateY(0) rotate(0);
      opacity: 1;
      filter: blur(0);
    }
  }

  /* Contrail */
  .state--default .icon:before {
    content: "";
    position: absolute;
    top: 50%;
    height: 2px;
    width: 0;
    left: -5px;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5));
  }
  .button.is-sent .state--default .icon:before {
    animation: contrail 0.8s linear forwards;
  }
  @keyframes contrail {
    0% {
      width: 0;
      opacity: 1;
    }
    8% {
      width: 15px;
    }
    60% {
      opacity: 0.7;
      width: 80px;
    }
    100% {
      opacity: 0;
      width: 160px;
    }
  }

  /* States */
  .state {
    padding-left: 29px;
    z-index: 2;
    display: flex;
    position: relative;
  }
  .state--default span:nth-child(4) {
  }
  .state--sent {
    display: none;
  }
  .state--sent svg {
    transform: scale(1.25);
    margin-right: 8px;
  }
  .button.is-sent .state--default {
    position: absolute;
  }
  .button.is-sent .state--sent {
    display: flex;
  }
  .button.is-sent .state--sent span {
    opacity: 0;
    animation: slideDown 0.8s ease forwards calc(var(--i) * 0.2s);
  }
  .button.is-sent .state--sent .icon svg {
    opacity: 0;
    animation: appear 1.2s ease forwards 0.8s;
  }
  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(4) rotate(-40deg);
      color: var(--primary);
      filter: blur(4px);
    }
    30% {
      opacity: 1;
      transform: scale(0.6);
      filter: blur(1px);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default SubmitButton;
