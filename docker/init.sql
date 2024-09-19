
-- Create table for Grid
CREATE TABLE grid (
    grid_id UUID PRIMARY KEY,
    rows INT NOT NULL,
    columns INT NOT NULL
);

-- Create table for Cell
CREATE TABLE cell (
    cell_id UUID PRIMARY KEY,
    grid_id UUID REFERENCES grid(grid_id),
    row_index INT NOT NULL,
    column_index INT NOT NULL,
    walkable BOOLEAN NOT NULL,
    occupant CHARACTER VARYING, -- Assuming occupant is a character's name or id, you can adjust accordingly
    UNIQUE (grid_id, row_index, column_index)
);

-- Create table for Character
CREATE TABLE character (
    character_id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position_row INT,
    position_column INT
);

-- Optional: Insert initial data (example)
-- INSERT INTO grid (grid_id, rows, columns) VALUES ('your-grid-id', 10, 10);
-- INSERT INTO cell (cell_id, grid_id, row_index, column_index, walkable) VALUES ('your-cell-id', 'your-grid-id', 0, 0, TRUE);
-- INSERT INTO character (character_id, name) VALUES ('your-character-id', 'Hero');
