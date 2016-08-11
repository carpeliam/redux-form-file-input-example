import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reduxForm, reducer as formReducer } from 'redux-form';

function MyComponent(props) {
    const {fields: {attachments}} = props;
    const onAttachmentChange = (e) => {
        e.preventDefault();
        const files = [...e.target.files];
        attachments.onChange(files);
    };
    console.log('this should have the same value the store has', attachments.value && attachments.value[0]);
    return (
        <form>
          {attachments.value && `Currently selected: ${attachments.value[0].name}`}
          <input type="file" onChange={onAttachmentChange} />
        </form>
    );
}

const ReduxFormWrapper = reduxForm({
    form: 'myform',
    fields: ['attachments']
})(MyComponent);

const store = createStore(combineReducers({ form: formReducer }));

render(
  <Provider store={store}>
    <ReduxFormWrapper />
  </Provider>,
  document.getElementById('root')
);
