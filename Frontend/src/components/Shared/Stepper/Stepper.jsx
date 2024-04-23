import React from 'react';
import style from './Stepper.module.scss';

const Stepper = (props) => {
  return (
    <section key={props.stepNumber}>
      <section className={style.stepperHeader}>
        <div className={style.stepNumber}>{props.stepNumber}</div>
        <div className={style.stepTitle}>{props.stepTitle}</div>
      </section>
      <section className={style.stepperContent}>
        <section className={style.leftSide}></section>
        <section className={style.rightSide}>
          {props.children}
        </section>
      </section>
    </section>
  );
}

export default Stepper;
