import React from 'react';
import Context from '../ReactHooksTestComponent/Context/Context';
import HookUpdates from '../ReactHooksTestComponent/HookUpdates/HookUpdates';
import HookRender from '../ReactHooksTestComponent/HookRender/HookRender';
import { HooksTestStatementsProps } from '../../utils/hooksTypes';

const HooksTestStatements = ({
  hooksStatements,
  dispatchToHooksTestCase,
}: HooksTestStatementsProps) => {
  return (
    <>
      {hooksStatements.map((statement, i) => {
        switch (statement.type) {
          case 'context':
            return (
              <Context
                key={statement.id}
                context={statement}
                index={i}
                dispatchToHooksTestCase={dispatchToHooksTestCase}
              />
            );
          case 'hook-updates':
            return (
              <HookUpdates
                key={statement.id}
                hookUpdates={statement}
                index={i}
                dispatchToHooksTestCase={dispatchToHooksTestCase}
              />
            );
          case 'hookRender':
            return (
              <HookRender
                key={statement.id}
                hookRender={statement}
                index={i}
                dispatchToHooksTestCase={dispatchToHooksTestCase}
              />
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default HooksTestStatements;
