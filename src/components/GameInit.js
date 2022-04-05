import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
  TextField, Paper, Button, Grid, Typography, Box,
} from '@material-ui/core';

/**
 * Pelin pystyttämiseen liittyvät asetukset
 *
 *
 */
const GameInit = ({ setGameParameters }) => {
  const [minSize, setMinSize] = useState(0);

  const onSubmit = async (values) => {
    setGameParameters(values);
  };
  const requiredFields = ['player1', 'player2'];
  const gridSizeFields = ['x', 'y'];
  const shipFields = {
    carrier: 5, battleship: 4, cruiser: 3, submarine: 3, destroyer: 2,
  };
  // positive integer
  const regex = /^[0-9]+$/;

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};
        let tmpMinSize = 0;
        Object.keys(shipFields).forEach((element) => {
          tmpMinSize += (values[element] && regex.test(values[element])
            ? shipFields[element] * parseInt(values[element], 10) : 0);
          if (values[element] && !regex.test(values[element])) {
            errors[element] = 'Vain positiivisiä kokonaislukuja';
          }
        });

        Object.keys(shipFields).forEach((element) => {
          if (tmpMinSize <= 0) {
            errors[element] = 'Tarvitaan ainakin 1 laiva';
          }
        });

        gridSizeFields.forEach((element) => {
          if (!values[element]) {
            errors[element] = 'Pakollinen kenttä';
          } else if (!regex.test(values[element])) {
            errors[element] = 'Vain positiivisiä kokonaislukuja';
          } else if (parseInt(values[gridSizeFields[0]], 10)
             * parseInt(values[gridSizeFields[1]], 10) < minSize) {
            errors[element] = 'Ruudukko alle laivaston koon';
          } else if ((parseInt(values[gridSizeFields[0]], 10) < 5
            && parseInt(values[gridSizeFields[1]], 10) < 5)) {
            errors[element] = 'Sivut liian pieniä';
          }
        });

        requiredFields.forEach((element) => {
          if (!values[element]) {
            errors[element] = 'Pakollinen kenttä';
          }
        });
        if (tmpMinSize !== minSize) {
          setMinSize(tmpMinSize);
        }
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
        errors,
      }) => (
        <form onSubmit={handleSubmit}>
          <Paper
            style={{
              alignContent: 'center', flexWrap: 'nowrap', display: 'inline-block',
            }}
            variant="outlined"
          >
            <Box style={{ padding: '15px' }}>
              <Typography variant="h3"> Laivanupotus </Typography>
              <Typography variant="subtitle"> Asetukset </Typography>
            </Box>
            <Grid style={{ }} container spacing={2} rowSpacing={5} direction="column">
              <Grid item>
                <Field name="player1">
                  {({ input, meta }) => (
                    <TextField
                      label="Pelaaja 1"
                      placeholder="Pelaaja 1"
                      onChange={(v) => input.onChange(v)}
                      helperText={((meta.error && meta.touched)
                        || meta.submitError) && errors.player1}
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
                      helperText={((meta.error && meta.touched)
                        || meta.submitError) && errors.player2}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

              <Grid item>

                <Box style={{ padding: '15px' }}>

                  <Grid container rowSpacing={5} direction="column">
                    <Typography style={{
                      float: 'left',
                    }}
                    >
                      Laivasto
                    </Typography>
                    <Grid>

                      <Field name="carrier">
                        {({ input, meta }) => (
                          <TextField
                            label="lentotukialukset"
                            placeholder="1"
                            helperText={((meta.error && meta.touched) || meta.submitError) ? errors.carrier : 'koko: 5'}
                            onChange={(v) => input.onChange(v)}
                            error={(meta.error && meta.touched) || meta.submitError}
                          />

                        )}
                      </Field>

                      <Field name="battleship">
                        {({ input, meta }) => (
                          <TextField
                            label="taistelulaivat"
                            placeholder="2"
                            helperText={((meta.error && meta.touched) || meta.submitError) ? errors.battleship : 'koko: 4'}
                            onChange={(v) => input.onChange(v)}
                            error={(meta.error && meta.touched) || meta.submitError}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid>

                      <Field name="cruiser">
                        {({ input, meta }) => (
                          <TextField
                            label="risteilijät"
                            placeholder="3"
                            helperText={((meta.error && meta.touched) || meta.submitError) ? errors.cruiser : 'koko: 3'}
                            onChange={(v) => input.onChange(v)}
                            error={(meta.error && meta.touched) || meta.submitError}
                          />

                        )}
                      </Field>

                      <Field name="submarine">
                        {({ input, meta }) => (
                          <TextField
                            label="sukellusveneet"
                            placeholder="4"
                            helperText={((meta.error && meta.touched) || meta.submitError) ? errors.submarine : 'koko: 3'}
                            onChange={(v) => input.onChange(v)}
                            error={(meta.error && meta.touched) || meta.submitError}
                          />

                        )}
                      </Field>
                    </Grid>

                    <Grid>

                      <Field name="destroyer">
                        {({ input, meta }) => (
                          <TextField
                            label="hävittäjät"
                            placeholder="5"
                            helperText={((meta.error && meta.touched) || meta.submitError) ? errors.destroyer : 'koko: 2'}
                            onChange={(v) => input.onChange(v)}
                            error={(meta.error && meta.touched) || meta.submitError}
                          />

                        )}
                      </Field>
                    </Grid>

                  </Grid>
                </Box>
              </Grid>
              <Box style={{ marginLeft: '25px' }}>

                <Typography variant="subtitle" style={{ float: 'left', marginLeft: '10px' }}>
                  Ruudukon koko
                </Typography>
                <br />

                <Typography variant="subtitle2" style={{ float: 'left', marginLeft: '10px' }}>
                  {`Ruudukon min  koko: ${minSize}`}
                </Typography>

                <Typography variant="subtitle2" style={{ float: 'left', marginLeft: '10px' }}>
                  Yhden sivun min koko: 5
                </Typography>
              </Box>

              <Grid item>

                <Field name="x">
                  {({ input, meta }) => (
                    <TextField
                      label="leveys"
                      placeholder="10"
                      onChange={(v) => input.onChange(v)}
                      helperText={((meta.error && meta.touched)
                         || meta.submitError) && errors.x}
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
                      helperText={((meta.error && meta.touched)
                        || meta.submitError) && errors.y}
                      error={(meta.error && meta.touched) || meta.submitError}
                    />

                  )}
                </Field>
              </Grid>

            </Grid>
            <Box style={{ padding: '15px' }}>
              {submitError && <div className="error">{submitError}</div>}
              <Button type="submit" disabled={submitting} variant="outlined">
                Play
              </Button>
              {/* <Button
                onClick={form.reset}
                disabled={submitting || pristine}
                variant="outlined"
              >
                Reset
              </Button> */}
            </Box>
          </Paper>

        </form>
      )}
    />
  );
};
export default GameInit;
