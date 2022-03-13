import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Paper, Button } from '@material-ui/core';

const GameInit = ({ doStuff }) => {
  const onSubmit = async (values) => {
    console.log(values, 'submit');
    doStuff(true, values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
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
            <Field name="x">
              {({ input, meta }) => (
                <TextField
                  label="size x"
                  type="number"
                  placeholder="100"
                  onChange={(v) => input.onChange(v)}
                  error={(meta.error && meta.touched) || meta.submitError}
                />

              )}
            </Field>

            <Field name="y">
              {({ input, meta }) => (
                <TextField
                  label="size y"
                  type="number"
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
};
export default GameInit;
