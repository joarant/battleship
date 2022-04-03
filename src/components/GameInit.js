import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  TextField, Paper, Button, Grid, Typography,
} from '@material-ui/core';

/**
 * Pelin pystyttämiseen liittyvät asetukset
 * eli pelaajien nimet, alukset ja ruudukon koko
 *
 *
 */
const GameInit = ({ setGameParameters }) => {
  const onSubmit = async (values) => {
    setGameParameters(values);
  };
  const requiredFields = ['player1', 'player2'];
  const gridSizeFields = ['x', 'y'];
  const shipFields = {
    carrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2,
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        let minSize = 0;
        let minSideSize = 2;

        Object.keys(shipFields).forEach((element) => {
          minSize += (values[element] ? shipFields[element] * parseInt(values[element], 10) : 0);
          minSideSize = (minSideSize < shipFields[element] ? minSideSize : shipFields[element]);
          if (values[element] && !(parseInt(values[element], 10) >= 0)) {
            errors[element] = 'Required';
          }
        });

        Object.keys(shipFields).forEach((element) => {
          if (minSize <= 0) {
            errors[element] = 'Required';
          }
        });

        gridSizeFields.forEach((element) => {
          if (!values[element]
             || parseInt(values[gridSizeFields[0]], 10)
             * parseInt(values[gridSizeFields[1]], 10) < minSize
             || (parseInt(gridSizeFields[0], 10) < minSideSize
             && parseInt(gridSizeFields[1], 10) < minSideSize)) {
            errors[element] = 'Required';
          }
        });

        requiredFields.forEach((element) => {
          if (!values[element]) {
            errors[element] = 'Required';
          }
        });

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
          <Paper
            style={{
              alignContent: 'center', padding: 15, flexWrap: 'nowrap', display: 'inline-block',
            }}
            variant="outlined"
          >
            <Typography variant="h3"> Laivanupotus </Typography>
            <Typography variant="subtitle"> Asetukset </Typography>

            <Grid style={{ }} container spacing={2} rowSpacing={5} direction="column">
              <Grid item>
                <Field name="player1">
                  {({ input, meta }) => (
                    <TextField
                      label="Pelaaja 1"
                      placeholder="Pelaaja 1"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>

                <Field name="player2">
                  {({ input, meta }) => (
                    <TextField
                      label="Pelaaja 2"
                      placeholder="Pelaaja 2"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Paper>
                  <Typography style={{
                    float: 'left',
                  }}
                  >
                    Laivasto
                  </Typography>

                  <Field name="carrier">
                    {({ input, meta }) => (
                      <TextField
                        label="Lentotukialus määrä"
                        placeholder="1"
                        helperText="koko: 5"
                        onChange={(v) => input.onChange(v)}
                        error={(meta.error && meta.touched) || meta.submitError}
                      />

                    )}
                  </Field>

                  <Field name="battleship">
                    {({ input, meta }) => (
                      <TextField
                        label="taistelulaiva määrä"
                        placeholder="2"
                        helperText="koko: 4"
                        onChange={(v) => input.onChange(v)}
                        error={(meta.error && meta.touched) || meta.submitError}
                      />
                    )}
                  </Field>

                  <Field name="cruiser">
                    {({ input, meta }) => (
                      <TextField
                        label="risteilijä määrä"
                        placeholder="3"
                        helperText="koko: 3"
                        onChange={(v) => input.onChange(v)}
                        error={(meta.error && meta.touched) || meta.submitError}
                      />

                    )}
                  </Field>

                  <Field name="submarine">
                    {({ input, meta }) => (
                      <TextField
                        label="sukellusvene määrä"
                        placeholder="4"
                        helperText="koko: 3"
                        onChange={(v) => input.onChange(v)}
                        error={(meta.error && meta.touched) || meta.submitError}
                      />

                    )}
                  </Field>

                  <Field name="destroyer">
                    {({ input, meta }) => (
                      <TextField
                        label="hävittäjä määrä"
                        placeholder="5"
                        helperText="koko: 2"
                        onChange={(v) => input.onChange(v)}
                        error={(meta.error && meta.touched) || meta.submitError}
                      />

                    )}
                  </Field>
                </Paper>
              </Grid>

              <Grid item>

                <Field name="x">
                  {({ input, meta }) => (
                    <TextField
                      label="leveys"
                      placeholder="10"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>

                <Field name="y">
                  {({ input, meta }) => (
                    <TextField
                      label="pituus"
                      placeholder="10"
                      onChange={(v) => input.onChange(v)}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

            </Grid>
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
          </Paper>

        </form>
      )}
    />
  );
};
export default GameInit;
