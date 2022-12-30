import { DataGrid, GridColDef, GridRowParams, GridRowId, GridColumns, GridActionsCellItem, GridCellModes, GridCellModesModel, GridEventListener } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear'; 
import * as React from 'react';
import deleteDeveloper from "../../pages/api/developers/delete";
import editDeveloper from "../../pages/api/developers/edit";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

interface IGridPros {
    initialColumns: string[][];
    initialRows:  {}[];
}

interface SelectedCellParams {
    id: GridRowId;
    field: string;
    value: string;
  }
  
  interface EditToolbarProps {
    selectedCellParams?: SelectedCellParams;
    cellModesModel: GridCellModesModel;
    setCellModesModel: (value: GridCellModesModel) => void;
    cellMode: 'view' | 'edit';
  }

let  rowIdEdit: string;

function EditToolbar(props: EditToolbarProps) {
    // Handle button Edit/Save and Cancel
    const { selectedCellParams, cellMode, cellModesModel, setCellModesModel } = props;
    
    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
            return;
        }
        const { id, field, value} = selectedCellParams;
        if (cellMode === 'edit') {
            setCellModesModel({
                ...cellModesModel,
                [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.View } },
            });
            const _id = rowIdEdit;
            editDeveloper(_id, {[field]: value})
            rowIdEdit = "";
        } else {
            setCellModesModel({
                ...cellModesModel,
                [id]: { ...cellModesModel[id], [field]: { mode: GridCellModes.Edit } },
            });
        }
    };

    const handleCancel = () => {
        if (!selectedCellParams) {
        return;
        }
        const { id, field } = selectedCellParams;
        setCellModesModel({
        ...cellModesModel,
        [id]: {
            ...cellModesModel[id],
            [field]: { mode: GridCellModes.View, ignoreModifications: true },
        },
        });
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        // Keep the focus in the cell
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 1,
            }}
            >
            <Button
                onClick={handleSaveOrEdit}
                onMouseDown={handleMouseDown}
                disabled={!selectedCellParams}
                variant="text"
            >
                {cellMode === 'edit' ? <SaveIcon /> : <EditIcon />}
            </Button>
            <Button
                onClick={handleCancel}
                onMouseDown={handleMouseDown}
                disabled={cellMode === 'view'}
                variant="text"
                sx={{ ml: 1 }}
            >
                <ClearIcon />
            </Button>
        </Box>
    )
}

export default function GridTable({initialColumns, initialRows}: IGridPros) {
    const [rows, setRows] =  React.useState(initialRows);
    const [onLoad, setLoad] = React.useState(false);

    /** Load First Data */
    React.useEffect(() => {
        if(!onLoad && initialRows.length > 0){
            setRows(initialRows);
            setLoad(true);
        }
    });

    /** Delete Row */
    const deleteRow = React.useCallback(
        (id: GridRowId, _id:string) => async () => {
          setTimeout(async () => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            await deleteDeveloper(_id);
          });
        },
        [],
    );

    /** Edit/Save Row */
    const [selectedCellParams, setSelectedCellParams] = React.useState<SelectedCellParams | null>(null);
    const [cellModesModel, setCellModesModel] = React.useState<GridCellModesModel>({});

    const handleCellFocus = React.useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
            const row = event.currentTarget.parentElement;
            const id = row!.dataset.id!;
            const field = event.currentTarget.dataset.field!;
            const value = event.target.value;
            setSelectedCellParams({ id, field, value });
        },
        [],
    );

    const handleCellOnChange = React.useCallback(
        (event: React.ChangeEvent<HTMLDivElement>) => {
            const row = event.currentTarget.parentElement;
            const id = row!.dataset.id!;
            const field = event.currentTarget.dataset.field!;
            const value = event.target.value;
            setSelectedCellParams({ id, field, value});
        },
        [],
    );
    
    const cellMode = React.useMemo(() => {
        if (!selectedCellParams) {
            return 'view';
        }
        const { id, field } = selectedCellParams;
        return cellModesModel[id]?.[field]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);

    const handleCellKeyDown = React.useCallback<GridEventListener<'cellKeyDown'>>(
        (params, event) => {
            if (cellMode === 'edit') {
                // Prevents calling event.preventDefault() if Tab is pressed on a cell in edit mode
                event.defaultMuiPrevented = true;
                rowIdEdit = params.row._id;
            }
        },
        [cellMode],
    );
    
    /** Seed Columns and Rows */
    let gridColumns = initialColumns.map((column: string[], index: number) => {
        return {field: column[0], headerName: column[1], width: 150, editable: true, getActions: (params: any) => {} }
    });

    gridColumns = [...gridColumns, 
        {field: 'remove', type: 'actions', headerName: 'Remove', width:150,
            getActions: (params) => [
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={deleteRow(params.id, params.row._id)} />
            ]
        }
    ]

    const columns = React.useMemo<GridColumns>(
        () => gridColumns,[deleteRow]
    );

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} 
            onCellKeyDown={handleCellKeyDown}
            cellModesModel={cellModesModel}
            onCellModesModelChange={(model) => setCellModesModel(model)}
            components={{
                Toolbar: EditToolbar,
              }}
              componentsProps={{
                toolbar: {
                  cellMode,
                  selectedCellParams,
                  setSelectedCellParams,
                  cellModesModel,
                  setCellModesModel,
                },
                cell: {
                  onFocus: handleCellFocus,
                  onChange: handleCellOnChange,
                },
              }}
              experimentalFeatures={{ newEditingApi: true }}
              />
        </div>
    );
}