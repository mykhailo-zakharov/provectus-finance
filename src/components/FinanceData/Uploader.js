import React, { Component } from 'react';
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as employeeActions } from '../../ducks/employee';
import { actions as commonActions } from '../../ducks/common';
import { actions as financeDataActions } from '../../ducks/financeData';
import { actions as quarterActions } from '../../ducks/quarter';
import { UPLOADER_APPEND_MODE } from '../../constants/quarterConstants';

const style = {
  uploader: {
    display: 'none',
  },
  uploadContainer: {
    cursor: 'pointer',
  },
  appendIconMode: {
    width: 36,
    height: 36,
  },
};

/* eslint-disable react/prop-types */
class Uploader extends Component {
  constructor(props) {
    super(props);
    this.onUpload = this.onUpload.bind(this);
  }

  onUpload = (event) => {
    const
    {
        upload,
        onModalOpen,
        offPreloader,
        onChangeData,
        fetchtaxRecords,
        appendtaxRecords,
        mode,
        data,
    } = this.props;

    const { files } = event.target;
    const { activeEmployee } = this.props.employee;

    if (files && files.length) {
      const { quarterName, year } = data;

      upload({ quarterName, year, files }, activeEmployee)
        .then((responce) => {
          if (mode === UPLOADER_APPEND_MODE) {
            appendtaxRecords(responce.data.taxRecords);
          } else {
            fetchtaxRecords(responce.data);
            onChangeData(quarterName, year);
            onModalOpen();
          }
        }).catch((err) => {
          console.error(err.message);
        }).finally(() => {
          offPreloader();
        });

      event.target.value = '';
    }
  }

  render() {
    const { key, mode } = this.props;
    return (<label
      style={style.uploadContainer}
      htmlFor={key}
    >
      <CloudUploadIcon
        style={mode === UPLOADER_APPEND_MODE
          ? style.appendIconMode
          : null}
      />
      <input
        id={key}
        style={style.uploader}
        accept=".xlsx, .xls, .csv"
        multiple
        type="file"
        onChange={this.onUpload}
      />
    </label>);
  }
}


const mapStateToProps = state => ({
  employee: state.employee,
  quarters: state.financeData.list,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...commonActions,
    ...employeeActions,
    ...financeDataActions,
    ...quarterActions,
  }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
