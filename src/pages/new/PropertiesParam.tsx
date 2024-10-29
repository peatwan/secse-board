import { Input, Tooltip } from '@nextui-org/react'
import { Properties } from './types/appConfig'
import { AppConfigPaths } from './types/path'
import SmoothCollapse from 'react-smooth-collapse'
import { useState } from 'react'
import { ArrowUpIcon } from 'assets/icons/ArrowUpIcon'
import { ArrowDownIcon } from 'assets/icons/ArrowDownIcon'

interface Props {
  properties: Properties
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const PropertiesParam: React.FC<Props> = ({ properties, handleUpdate }) => {
  const [isShowMore, setIsShowMore] = useState(false)

  return (
    <div>
      <span className="text-2xl font-semibold leading-7 text-gray-900">
        Molecular Properties
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Molecular Weights Cutoff"
            value={properties.mw}
            onValueChange={(value) => handleUpdate('properties.mw', value)}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="logP Min"
            value={properties.logpLower}
            onValueChange={(value) =>
              handleUpdate('properties.logpLower', value)
            }
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="logP Max"
            value={properties.logpUpper}
            onValueChange={(value) =>
              handleUpdate('properties.logpUpper', value)
            }
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Chiral Center Max"
            value={properties.chiralCenter}
            onValueChange={(value) =>
              handleUpdate('properties.chiralCenter', value)
            }
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Heteroatom Ratio Max"
            value={properties.heteroatomRatio}
            onValueChange={(value) =>
              handleUpdate('properties.heteroatomRatio', value)
            }
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Rdkit Rotatable Bound Number Max"
            value={properties.rdkitRotatableBoundNum}
            onValueChange={(value) =>
              handleUpdate('properties.rdkitRotatableBoundNum', value)
            }
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Rigid Body Number Max"
            value={properties.rigidBodyNum}
            onValueChange={(value) =>
              handleUpdate('properties.rigidBodyNum', value)
            }
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
      </div>
      <div
        className={`${
          isShowMore ? 'invisible' : ''
        } flex items-center justify-center pt-5`}
      >
        <Tooltip delay={500} content="show more">
          <div
            className="flex min-w-full items-center justify-center rounded-lg  py-1 hover:bg-default-100"
            onClick={() => setIsShowMore(true)}
          >
            <div className="size-6">
              <ArrowDownIcon />
            </div>
          </div>
        </Tooltip>
      </div>

      <SmoothCollapse expanded={isShowMore} heightTransition="0.3s ease">
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="KEEN Rotatable Bound Number Max "
              value={properties.keenRotatableBoundNum}
              onValueChange={(value) => handleUpdate('properties.mw', value)}
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="HBD Max"
              value={properties.hbd}
              onValueChange={(value) => handleUpdate('properties.hbd', value)}
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="HBA Max"
              value={properties.hba}
              onValueChange={(value) => handleUpdate('properties.hba', value)}
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="TPSA Max"
              value={properties.tpsa}
              onValueChange={(value) => handleUpdate('properties.tpsa', value)}
              validate={(e) => {
                if (isNaN(Number(e))) {
                  return 'Please enter a number'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Lipinski Rule Violation Max"
              value={properties.lipinskiViolation}
              onValueChange={(value) =>
                handleUpdate('properties.lipinskiViolation', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="QED Cutoff"
              value={properties.qed}
              onValueChange={(value) => handleUpdate('properties.qed', value)}
              validate={(e) => {
                if (isNaN(Number(e))) {
                  return 'Please enter a number'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Ring Size Max"
              value={properties.maxRingSize}
              onValueChange={(value) =>
                handleUpdate('properties.maxRingSize', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Ring System Member Size Max"
              value={properties.maxRingSystemSize}
              onValueChange={(value) =>
                handleUpdate('properties.maxRingSystemSize', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Ring System Count Max"
              value={properties.ringSystemCount}
              onValueChange={(value) =>
                handleUpdate('properties.ringSystemCount', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Bridged Ring Site Count Max"
              value={properties.bridgedSiteCount}
              onValueChange={(value) =>
                handleUpdate('properties.bridgedSiteCount', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Spiro Ring Site Count Max"
              value={properties.spiroSiteCount}
              onValueChange={(value) =>
                handleUpdate('properties.spiroSiteCount', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Fused Ring Site Count Max"
              value={properties.fusedSiteCount}
              onValueChange={(value) =>
                handleUpdate('properties.fusedSiteCount', value)
              }
              validate={(e) => {
                if (!Number.isInteger(Number(e))) {
                  return 'Please enter an integer'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Synthetic Accessibility Score Cutoff"
              value={properties.rdkitSaScore}
              onValueChange={(value) =>
                handleUpdate('properties.rdkitSaScore', value)
              }
              validate={(e) => {
                if (isNaN(Number(e))) {
                  return 'Please enter a number'
                }
              }}
            />
          </div>
          <div className="sm:col-span-2">
            <Input
              type="text"
              labelPlacement="inside"
              label="Substructure Filter"
              value={properties.substructureFilter}
              onValueChange={(value) =>
                handleUpdate('properties.substructureFilter', value)
              }
            />
          </div>
        </div>
        <div className="flex items-center justify-center pt-5">
          <Tooltip delay={500} content="show less">
            <div
              className="flex min-w-full items-center justify-center rounded-lg  py-0.5 hover:bg-default-100"
              onClick={() => setIsShowMore(false)}
            >
              <div className="size-6">
                <ArrowUpIcon />
              </div>
            </div>
          </Tooltip>
        </div>
      </SmoothCollapse>
    </div>
  )
}

export default PropertiesParam
