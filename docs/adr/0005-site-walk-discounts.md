# 0005 · Site-walk discounts: schedules and fan behavior, not "has a BAS"

## Status
Accepted (C0, October 1, 2026). Replaces the placeholder 25% (existing BAS) and 20% (overdue maintenance) that the AI made up in planning (prompt log F6).

## Context
The adjusted case cut the vendor claim 25% whenever the building had a BAS. But most controller savings come from fan control: in the PNNL field test of 66 rooftop units in 8 buildings, advanced controls cut rooftop-unit energy 57% on average, mostly from fan control, on units whose fans had run nonstop at one speed. Many buildings with a BAS still run their fans all day at full speed, so "has a BAS" can't tell whether the waste is still there. The LBNL study of about 1,500 buildings found tune-ups alone saved a median 5% to 14% of whole-building energy, so overdue maintenance means part of a promised saving is really a tune-up.

## Decision
Replace `existingControls` (none, basic thermostats, BAS) with two site questions about behavior: "Do the units run on schedules?" and "Do the supply fans slow down or shut off?" (yes, no, unknown each).

- No schedules → 0% cut (all the waste is still there; the claim is believable as stated)
- Schedules, one-speed fans → 25%
- Schedules, fans that slow down or shut off → 50% (most of the waste is already gone)
- Unknown on either (and schedules not "no") → 25%, plus the note "Fan behavior unknown. Ask your tech to check on the next site walk"
- Maintenance over 24 months → another 20% of what remains; unknown or recent → 0%
- Economizer and coil condition are red flag questions only, never math
- Every cut is labeled "rule of thumb, editable" on screen

Rejected: keeping BAS yes/no (misses the fan waste); 0% for unknown (trusts the vendor by default); 50% for unknown (punishes the vendor for something nobody checked); a separate "basic thermostats" level (a programmable thermostat with schedules wastes the same as a BAS with schedules).

## Consequences
The worked example is unchanged: P01 has schedules and constant-speed fans (25%) and overdue maintenance (20%), giving 18.0% / 13.5% / 10.8%. The research shows where savings come from, not the size of each cut. The cut values are Joe's rules of thumb and must be presented that way. `SiteConditionsSchema`, the Site board and the assumption copy changed. The 20% maintenance cut is small next to what a tune-up can save, on purpose.
