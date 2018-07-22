import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Tax from './Tax';
import CreateTax from './CreateTax';

import { actions as employeeActions } from '../../ducks/employee';
import { actions as commonActions } from '../../ducks/common';
import { actions as financeDataActions } from '../../ducks/financeData';

const style = {
  quarterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '15px',
  },
};

class Quarter extends Component {
  constructor(props) {
    super(props);
        // this.onSelected = this.onSelected.bind(this);
  }


  render() {
    const { item } = this.props;
    const { quarterName, year } = item.quarterDefinition;

    return (
      <div className="quarter-box">
        <div style={style.quarterHeader} className="quarter-header">
          <h1 className="quarter-title">
                  Quarter {`${year} ${quarterName}`}
          </h1>
          {this.props.renderUploader(item)}
        </div>
        <table className="quarter-table">
          <tr>
            <td />
            <td colSpan="6">Валюта Поступления</td>
            <td>Единый Налог</td>
            <td />
          </tr>
          <tr><td>Наименование Контрагента</td>
            <td>Дата поступения денежных средств</td>
            <td>Доллары</td>
            <td>Гривна</td>
            <td>Курс НБУ на дату поступления</td>
            <td>Эквивалент в гривне по курсу НБУ к налогообложению</td>
            <td>Сумма к налогообложению</td>
            <td>Начислено</td>
            <td />
          </tr>

          {item.taxRecords && item.taxRecords.length > 0 &&
                        item.taxRecords.map(i => <Tax
                          item={i}
                          taxEdite={this.props.taxEdite}
                          quarterid={item.id}
                          setTaxEdite={this.props.setTaxEdite}
                        />)}

          <CreateTax
            idQuarter={item.id}
            setTaxEdite={this.props.setTaxEdite}
            taxEdite={this.props.taxEdite}
          />

        </table>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  employee: state.employee,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    ...commonActions,
    ...employeeActions,
    ...financeDataActions,
  }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Quarter);
