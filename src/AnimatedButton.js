import React from 'react';
import styled from 'styled-components';

const AnimatedButton = ({ onClick }) => {
  return (
    <StyledWrapper>
      <button className="button" onClick={onClick}>
        <div className="wrap">
          <p>
            Start Generating
            <span>𖣯</span>
          </p>
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    --white: #ffe7ff;
    --bg: #080808;
    --radius: 100px;
    outline: none;
    cursor: pointer;
    border: 0;
    position: relative;
    border-radius: var(--radius);
    background-color: var(--bg);
    transition: all 0.2s ease;
    box-shadow:
      inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.5),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }
  .button .wrap {
    font-size: 25px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    padding: 32px 45px;
    border-radius: inherit;
    position: relative;
    overflow: hidden;
  }
  .button .wrap p span:nth-child(2) {
    display: none;
  }
  .button:hover .wrap p span:nth-child(1) {
    display: none;
  }
  .button:hover .wrap p span:nth-child(2) {
    display: inline-block;
  }
  .button .wrap p {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    transition: all 0.2s ease;
    transform: translateY(2%);
    mask-image: linear-gradient(to bottom, white 40%, transparent);
  }
  .button .wrap::before,
  .button .wrap::after {
    content: "";
    position: absolute;
    transition: all 0.3s ease;
  }
  .button .wrap::before {
    left: -15%;
    right: -15%;
    bottom: 25%;
    top: -100%;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.12);
  }
  .button .wrap::after {
    left: 6%;
    right: 6%;
    top: 12%;
    bottom: 40%;
    border-radius: 22px 22px 0 0;
    box-shadow: inset 0 10px 8px -10px rgba(255, 255, 255, 0.8);
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  .button:hover {
    box-shadow:
      inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.4),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.7),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.7),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }
  .button:hover .wrap::before {
    transform: translateY(-5%);
  }
  .button:hover .wrap::after {
    opacity: 0.4;
    transform: translateY(5%);
  }
  .button:hover .wrap p {
    transform: translateY(-4%);
  }
  .button:active {
    transform: translateY(4px);
    box-shadow:
      inset 0 0.3rem 0.5rem rgba(255, 255, 255, 0.5),
      inset 0 -0.1rem 0.3rem rgba(0, 0, 0, 0.8),
      inset 0 -0.4rem 0.9rem rgba(255, 255, 255, 0.4),
      0 3rem 3rem rgba(0, 0, 0, 0.3),
      0 1rem 1rem -0.6rem rgba(0, 0, 0, 0.8);
  }
`

export default AnimatedButton;
