import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Cancel from 'material-ui/svg-icons/navigation/cancel';
import Approve from 'material-ui/svg-icons/action/check-circle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { red500, green500 } from 'material-ui/styles/colors';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import { actions as employeeActions } from '../../ducks/employee';
import { actions as commonActions } from '../../ducks/common';
import { actions as financeDataActions } from '../../ducks/financeData';
import { actions as quarterActions } from '../../ducks/quarter';
import Uploader from './Uploader';

import {
  COLUMN_NAMES,
  APPROVED,
  REJECTED,
  UNDEFINED,
  FILTER_ALL_VALUE,
  UPLOADER_APPEND_MODE,
  UNDEFINED_ERROR_MESSAGE,
} from '../../constants/quarterConstants';
import { getQuaterRecordData, getRowColor, getDateString, isAnyUndefinedRecord } from '../../utils/quarterUtils';

const style = {
  dialogStyle: {
    width: '100%',
  },
  tableRow: {
    textAlign: 'center',
    whiteSpace: 'initial',
    width: '10%',
    padding: '0',
    margin: '5px',
    verticalAlign: 'middle',
    height: '70px',
  },
  tableColumn: {
    width: '10%',
    textAlign: 'center',
    whiteSpace: 'initial',
    padding: '0',
    margin: '5px',
    height: '50px',
    color: 'black',
    verticalAlign: 'top',
    fontSize: 'medium',
  },
  tableBody: {
    width: '100%',
    color: 'black',
  },
  controlHeader: {
    height: 'auto',
  },
  uploaderBox: {
    textAlign: 'right',
    height: 'auto',
  },
  dialogTitle: {
    border: 0,
    marginLeft: '20px',
  },
  dialogContentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
};

/* eslint-disable react/prop-types */
class QuarterModal extends Component {

  constructor(props) {
    super(props);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onRenderActions(status, id) {
    const approveButton = (<IconButton
      id={id}
      name={APPROVED}
      title="Approve"
      onClick={() => this.onChangeStatusClick(id, APPROVED)}
    >
      <Approve color={green500} />
    </IconButton>);

    const rejectButton = (<IconButton
      title="Reject"
      id={id}
      name={REJECTED}
      onClick={() => this.onChangeStatusClick(id, REJECTED)}
    >
      <Cancel color={red500} />
    </IconButton>);

    const buttonsContainer = [];

    switch (status) {
      case APPROVED: buttonsContainer.push(rejectButton); break;
      case REJECTED: buttonsContainer.push(approveButton); break;
      case UNDEFINED: {
        buttonsContainer.push(approveButton);
        buttonsContainer.push(rejectButton);
      } break;
      default: break;
    }

    return buttonsContainer;
  }

  onChangeStatusClick(id, actionType) {
    this.props.changeStatus(id, actionType);
  }

  onFilterChanged(filter) {
    this.props.filtertaxRecords(filter);
  }

  onRenderStateSelector() {
    const { filterItems } = this.props.quarter;

    return (
      <SelectField
        floatingLabelText="Выберите статус"
        value={this.props.quarter.filterValue}
        hintText={FILTER_ALL_VALUE}
        onChange={(event, index, filter) => this.onFilterChanged(filter)}
      >
        {filterItems.map(filter => (<MenuItem
          id={filter}
          key={filter}
          value={filter}
          primaryText={filter}
        />))
        }
      </SelectField>
    );
  }

  onRenderHeader() {
    return (<TableHeader
      enableSelectAll={false}
      adjustForCheckbox={false}
      displaySelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn style={style.controlHeader} colSpan="9">
          {this.onRenderStateSelector()}
        </TableHeaderColumn>
        <TableHeaderColumn style={style.uploaderBox} >
          <Uploader
            data={this.props.data}
            key={`${this.props.id}_${UPLOADER_APPEND_MODE}`}
            id={this.props.id}
            mode={UPLOADER_APPEND_MODE}
          />
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        { COLUMN_NAMES.map(column => (
          <TableHeaderColumn
            style={style.tableColumn}
          >{column}</TableHeaderColumn>)) }
      </TableRow>
    </TableHeader>);
  }

  onRenderBody() {
    const { taxRecords } = this.props.quarter;

    return (
      <TableBody
        style={style.tableBody}
        displayRowCheckbox={false}
        stripedRows={false}
      >
        { map(taxRecords, (row, index) => {
          const {
          counterpartyName,
          receivingDate,
          usdRevenue,
          uahRevenue,
          exchRateUsdUahNBUatReceivingDate,
          paymentPurpose,
          equivalentUAH,
          taxationSum,
          ep,
        } = getQuaterRecordData(row);

          return (<TableRow style={{ background: getRowColor(row.taxationStatus) }} key={index}>
            <TableRowColumn style={style.tableRow}>{counterpartyName}</TableRowColumn>
            <TableRowColumn style={style.tableRow} >
              {getDateString(receivingDate)}
            </TableRowColumn>
            <TableRowColumn style={style.tableRow} >{usdRevenue}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>{uahRevenue}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>
              {exchRateUsdUahNBUatReceivingDate.toFixed(4)}
            </TableRowColumn>
            <TableRowColumn style={style.tableRow}>{equivalentUAH.toFixed(4)}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>{taxationSum.toFixed(4)}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>{ep.toFixed(4)}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>{paymentPurpose}</TableRowColumn>
            <TableRowColumn style={style.tableRow}>
              {this.onRenderActions(row.taxationStatus, row.id)}
            </TableRowColumn>
          </TableRow>);
        })
            }
      </TableBody>);
  }


  onRenderTable() {
    return (<Table
      fixedHeader
      selectable={false}
    >
      {this.onRenderHeader()}
      {this.onRenderBody()}
    </Table>);
  }

  onSaveClick() {
    const { sendQuarterRecords, quarter, downloadFile, offPreloader, onModalClose } = this.props;
    const { quarterDefinition, id, inittaxRecords } = quarter;
    const isUndefinedRecord = isAnyUndefinedRecord(inittaxRecords);

    if (isUndefinedRecord) {
      window.alert(UNDEFINED_ERROR_MESSAGE);
      return;
    }

    sendQuarterRecords({ taxRecords: inittaxRecords, quarterDefinition, id })
    .then((responce) => {
      onModalClose();
      downloadFile(responce.data.location);
    }).catch((err) => {
      console.error(err.message);
    }).finally(() => {
      offPreloader();
    });
  }

  render() {
    const { onModalClose, data } = this.props;
    const { year, quarterName } = data;

    return (
      <Dialog
        contentStyle={style.dialogContentStyle}
        autoScrollBodyContent
        autoDetectWindowHeight
        titleStyle={style.dialogTitle}
        className={'quoterDialog'}
        style={style.dialogStyle}
        title={`Quarter ${year} ${quarterName}`}
        actions={[
          <FlatButton
            label="Save and Generate"
            primary
            onClick={this.onSaveClick}
          />,
          <FlatButton
            label="Cancel"
            primary
            onClick={onModalClose}
          />,
        ]}
        modal
        open
        onRequestClose={onModalClose}
      >
        <div>
          {this.onRenderTable()}
        </div>
      </Dialog>
    );
  }

}

const mapStateToProps = state => ({
  employees: state.employee,
  quarter: state.quarter,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...commonActions,
    ...employeeActions,
    ...financeDataActions,
    ...quarterActions,
  }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuarterModal);
