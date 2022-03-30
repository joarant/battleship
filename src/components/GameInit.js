import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  TextField, Paper, Button, Grid,
} from '@material-ui/core';

const GameInit = ({ setGameParameters }) => {
  const onSubmit = async (values) => {
    console.log(values, 'submit');
    setGameParameters(values);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        const requiredFields = ['username1', 'username2'];
        // if (!values.username1) {
        //   errors.username1 = 'Required';
        // }
        // console.log(errors);
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
          <Paper style={{ alignContent: 'center', padding: 15, flexWrap: 'nowrap' }} variant="outlined">
            <Grid style={{ }} container spacing={2} rowSpacing={1} direction="column">
              <Grid item>
                <Field name="player1">
                  {({ input, meta }) => (
                    <TextField
                      label="player 1"
                      placeholder="player 1"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>

                <Field name="player2">
                  {({ input, meta }) => (
                    <TextField
                      label="player 2"
                      placeholder="player 2"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Field name="x">
                  {({ input, meta }) => (
                    <TextField
                      label="size x"
                      type="number"
                      placeholder="10"
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
                      placeholder="10"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Field name="carrier">
                  {({ input, meta }) => (
                    <TextField
                      label="carrier count"
                      type="number"
                      placeholder="1"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>

                <Field name="battleship">
                  {({ input, meta }) => (
                    <TextField
                      label="battleship count"
                      placeholder="2"
                      type="number"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Field name="cruiser">
                  {({ input, meta }) => (
                    <TextField
                      label="cruiser count"
                      placeholder="3"
                      type="number"
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
                      type="number"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Field name="destroyer">
                  {({ input, meta }) => (
                    <TextField
                      label="destroyer count"
                      placeholder="5"
                      type="number"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

            </Grid>
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
