import React from 'react';
import styles from '../Assertion/Assertion.module.scss';
import { deleteAssertion, updateAssertion } from '../../../context/testCaseActions';
import AutoComplete from '../AutoComplete/AutoComplete';
const minusIcon = require('../../../assets/images/minus-box-outline.png');
const questionIcon = require('../../../assets/images/help-circle.png');

const LastAssertion = ({ assertion, dispatchToTestCase, isLast }) => {
  const handleChangeAssertionFields = (e, field) => {
    let updatedAssertion = { ...assertion };
    field === 'isNot' ? updateAssertion[field] = !updatedAssertion.isNot : updatedAssertion[field] = e.target.value;
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
    ];
    return matchersWithValues.includes(matcherType);
  };

  const style = { width: '15px', height: '15px' };
  return (
    <section id={styles.assertion}>
      <div id={styles.assertionHeader}>
        <h3>Assertion</h3>
        {!isLast && <img src={minusIcon} style={style} alt='delete' onClick={handleClickDelete} />}
      </div>
      <label htmlFor='queryVariant'>Query Selector</label>
      <img src={questionIcon} alt='help' style={style} />
      <select id='queryVariant' onChange={e => handleChangeAssertionFields(e, 'queryVariant')}>
        <option value='' />
        <option value='getBy'>getBy</option>
        <option value='getAllBy'>getAllBy</option>
        <option value='queryBy'>queryBy</option>
        <option value='queryAllBy'>queryAllBy</option>
        <option value='findBy'>findBy</option>
        <option value='findAllBy'>findAllBy</option>
      </select>
      <img src={questionIcon} alt='help' style={style} />
      <select id='querySelector' onChange={e => handleChangeAssertionFields(e, 'querySelector')}>
        <option value='' />
        <option value='LabelText'>LabelText</option>
        <option value='PlaceholderText'>PlaceholderText</option>
        <option value='ByText'>Text</option>
        <option value='AltText'>AltText</option>
        <option value='Title'>Title</option>
        <option value='DisplayValue'>DisplayValue</option>
        <option value='Role'>Role</option>
        <option value='TestId'>TestId</option>
        {/* TextMatch Precision & Normalization will be added */}
      </select>
      <input type='text' onChange={e => handleChangeAssertionFields(e, 'queryValue')} />
      <label htmlFor='matcher'>Matcher</label>
      <AutoComplete
        statement={assertion}
        statementType='assertion'
        dispatchToTestCase={dispatchToTestCase}
      />
      {needsMatcherValue(assertion.matcherType) && (
        <span>
          <label htmlFor='matcherValue' />
          <input
            type='text'
            id='matcherValue'
            onChange={e => handleChangeAssertionFields(e, 'matcherValue')}
          />
        </span>
      )}
    </section>
  );
};

export default LastAssertion;
