import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { TextField, Paper, Button } from '@material-ui/core';

function GameInit() {
  const onSubmit = async (values) => {
    // if (values.username !== 'erikras') {
    //   return { username: 'Unknown username' };
    // }
    // if (values.password !== 'finalformrocks') {
    //   return { [FORM_ERROR]: 'Login Failed' };
    // }
    console.log(values, 'submit');
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        // console.log(values);
        const errors = {};
        if (!values.username1) {
          errors.username1 = 'Required';
        }
        console.log(errors);

        return errors;
      }}
      render={({
        submitError,
        handleSubmit,
        form,
        submitting,
        touched,
        pristine,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Paper style={{ alignContent: 'center', padding: 15 }}>
            <Field name="username1">
              {({ input, meta }) => (
                <TextField
                  label="player 1"
                  placeholder="player 1"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>

            <Field name="username2">
              {({ input, meta }) => (
                <TextField
                  label="player 1"
                  placeholder="player 1"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
            <Field name="size">
              {({ input, meta }) => (
                <TextField
                  label="size"
                  placeholder="100"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>

            <Field name="carrier">
              {({ input, meta }) => (
                <TextField
                  label="carrier count"
                  placeholder="1"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
            <Field name="Battleship">
              {({ input, meta }) => (
                <TextField
                  label="Battleship count"
                  placeholder="2"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
            <Field name="cruiser">
              {({ input, meta }) => (
                <TextField
                  label="cruiser count"
                  placeholder="3"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
            <Field name="submarine">
              {({ input, meta }) => (
                <TextField
                  label="submarine count"
                  placeholder="4"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
            <Field name="destroyer">
              {({ input, meta }) => (
                <TextField
                  label="destroyer count"
                  placeholder="5"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>
          </Paper>
          {submitError && <div className="error">{submitError}</div>}
          <Button type="submit" disabled={submitting} variant="outlined">
            Play
          </Button>
          <Button
            onClick={form.reset}
            disabled={submitting || pristine}
            variant="outlined"
          >
            Reset
          </Button>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  );
}
export default GameInit;
