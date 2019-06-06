import React from 'react';
import styles from '../Assertion/Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/testCaseActions';
import ToolTip from '../ToolTip/ToolTip';
import ToolTipMatcher from '../ToolTip/ToolTipMatcher';
import AutoComplete from '../AutoComplete/AutoComplete';

const questionIcon = require('../../../assets/images/help-circle.png');
const closeIcon = require('../../../assets/images/close.png');
const dragIcon = require('../../../assets/images/drag-vertical.png');

const LastAssertion = ({ assertion, dispatchToTestCase, isLast }) => {
  const handleChangeAssertionFields = (e, field) => {
    let updatedAssertion = { ...assertion };
    field === 'isNot'
      ? (updatedAssertion[field] = !updatedAssertion.isNot)
      : (updatedAssertion[field] = e.target.value);
    dispatchToTestCase(updateAssertion(updatedAssertion));
  };

  const handleClickDelete = e => {
    dispatchToTestCase(deleteAssertion(assertion.id));
  };

  const needsMatcherValue = matcherType => {
    const matchersWithValues = [
      'toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'toHaveAttribute', //takes in a string Ex: 'type'
      'toHaveClass', //takes in a string Ex: 'btn-link'
      'toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'toHaveStyle', //takes in a sting value Ex: 'display: none'
      'toHaveTextContent', //takes in a string value Ex: 'Content'
      'not.toContainElement', //takes in a HTML element Ex: <span data-testid="descendant"></span>
      'not.toContainHTML', //takes in a string Ex: '<span data-testid="child"></span>'
      'not.toHaveAttribute', //takes in a string Ex: 'type'
      'not.toHaveClass', //takes in a string Ex: 'btn-link'
      'not.toHaveFormValues', //takes in an object Ex: {username: 'jane.doe', rememberMe:}
      'not.toHaveStyle', //takes in a sting value Ex: 'display: none'
      'not.toHaveTextContent', //takes in a string value Ex: 'Content'
    ];
    return matchersWithValues.includes(matcherType);
  };

  return (
    <section id={styles.assertion}>
      {!isLast && <img src={closeIcon} id={styles.close} alt='close' onClick={handleClickDelete} />}
      <div id={styles.assertionHeader}>
        {!isLast && <img src={dragIcon} alt='drag' />}
        <h3>Assertion</h3>
      </div>
      <div id={styles.queryFlexBox}>
        <div id={styles.querySelector}>
          <label htmlFor='queryVariant' className={styles.queryLabel}>
            Query Selector
          </label>
          <div id={styles.dropdownFlex}>
            <select
              id='queryVariant'
              onChange={e => handleChangeAssertionFields(e, 'queryVariant')}
            >
              <option value='' />
              <option value='getBy'>getBy</option>
              <option value='getAllBy'>getAllBy</option>
              <option value='queryBy'>queryBy</option>
              <option value='queryAllBy'>queryAllBy</option>
              <option value='findBy'>findBy</option>
              <option value='findAllBy'>findAllBy</option>
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={assertion.queryVariant} />
              </span>
            </span>
            <select
              id='querySelector'
              onChange={e => handleChangeAssertionFields(e, 'querySelector')}
            >
              <option value='' />
              <option value='LabelText'>LabelText</option>
              <option value='PlaceholderText'>PlaceholderText</option>
              <option value='Text'>Text</option>
              <option value='AltText'>AltText</option>
              <option value='Title'>Title</option>
              <option value='DisplayValue'>DisplayValue</option>
              <option value='Role'>Role</option>
              <option value='TestId'>TestId</option>
              {/* TextMatch Precision & Normalization will be added */}
            </select>
            <span id={styles.hastooltip} role='tooltip'>
              <img src={questionIcon} alt='help' />
              <span id={styles.tooltip}>
                <ToolTip toolTipType={assertion.querySelector} />
              </span>
            </span>
          </div>
        </div>
        <div id={styles.query}>
          <label htmlFor='queryValue' className={styles.queryLabel}>
            Query
          </label>
          <input type='text' onChange={e => handleChangeAssertionFields(e, 'queryValue')} />
        </div>
      </div>
      <div id={styles.matcherLabelFlexBox}>
        <div>
          <label htmlFor='matcher'>Matcher</label>
        </div>
        <div>
          Not?
          <input type='checkbox' onClick={e => handleChangeAssertionFields(e, 'isNot')} />
        </div>
      </div>
      <div id={styles.matcherFlexBox}>
        <AutoComplete
          statement={assertion}
          statementType='assertion'
          dispatchToTestCase={dispatchToTestCase}
          className={styles.matcherInput}
        />
        <span id={styles.hastooltip} role='tooltip'>
          <img src={questionIcon} alt='help' />
          <span id={styles.tooltip}>
            <ToolTipMatcher toolTipType={assertion.matcherType} />
          </span>
        </span>
        {needsMatcherValue(assertion.matcherType) && (
          <span>
            <label htmlFor='matcherValue' />
            <input
              type='text'
              id='matcher'
              className={styles.matcherInput}
              onChange={e => handleChangeAssertionFields(e, 'matcherValue')}
            />
          </span>
        )}
      </div>
    </section>
  );
};

export default LastAssertion;
