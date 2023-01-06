import { DataGrid, GridColumns, GridActionsCellItem, GridRowId, GridCellModesModel, GridEventListener } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import deleteDeveloper from "../../pages/api/developers/delete";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from 'next/router';

interface IGridPros {
    initialColumns: string[][];
    initialRows:  {}[];
    action: string;
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
    selectedAction: string;
  }

let  rowIdEdit: string;

function EditToolbar(props: EditToolbarProps) {
    // Handle button Edit
    const { selectedCellParams, cellMode, selectedAction } = props;
    const router = useRouter()
    const handleSaveOrEdit = () => {
        if (!selectedCellParams) {
            return;
        }
        
        if (cellMode !== 'edit') {
            router.push({
                pathname: '/[action]/edit/[pid]',
                query: { 
                    action:selectedAction,
                    pid: rowIdEdit },
              })
        }
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
                <EditIcon />
            </Button>
        </Box>
    )
}

export default function GridTable({initialColumns, initialRows, action}: IGridPros) {
    const [rows, setRows] =  React.useState(initialRows);
    const [onLoad, setLoad] = React.useState(false);
    const [selectedAction, setSelectedAction] = React.useState(action)

    /** Load First Data */
    React.useEffect(() => {
        if(!onLoad && initialRows.length > 0){
            setRows(initialRows);
            setLoad(true);
            setSelectedAction(action);
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
    
    const cellMode = React.useMemo(() => {
        if (!selectedCellParams) {
            return 'view';
        }
        const { id, field } = selectedCellParams;
        return cellModesModel[id]?.[field]?.mode || 'view';
    }, [cellModesModel, selectedCellParams]);

    const handleCellClick = React.useCallback<GridEventListener<'cellClick'>>(
        (params) => {
            rowIdEdit = params.row._id;
        },[]
    );
    
    /** Seed Columns and Rows */
    let gridColumns = initialColumns.map((column: string[]) => {
        return {field: column[0], headerName: column[1], width: 150, editable: false, getActions: (params: any) => {} }
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
            onCellClick={handleCellClick}
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
                  selectedAction,
                },
                cell: {
                  onFocus: handleCellFocus,
                },
              }}
              experimentalFeatures={{ newEditingApi: true }}
              />
        </div>
    );
}